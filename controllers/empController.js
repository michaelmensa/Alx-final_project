import dbClient from '../config/db';
import utils from '../utils/utils';

const empController = {
  postNew: async (req, res) => {
    const name = req.body ? req.body.name : null;
    const type = req.body ? req.body.type : null;
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    const clinicId = req.session.user.id;
    if (!name) {
      res.status(400).json({ error: 'Employee Name is missing' });
      return;
    }
    if (!email) {
      res.status(400).json({ error: 'Employee Email is missing' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Employee Password is missing' });
      return;
    }
    if (!type) {
      res.status(400).json({ error: 'Employee type is missing' });
      return;
    }

    try {
      // check if clinic exists
      const existingEmp = await dbClient.findEmp(email);
      if (!existingEmp) {
        await dbClient.createEmp(name, type, email, password, clinicId);
        const newEmp = await dbClient.findEmp(email);
        console.log('New employee created:', newEmp._id.toString());
        res.status(201).json({ id: newEmp._id.toString(), email: newEmp.email });
      } else {
        res.status(400).json({ error: 'Employee Already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  getShow: async (req, res) => {
    // query by type and page number for pagination
    const { id } = req.params;
    const clinicId = req.session.clinic.id;
    const matchCondition = { clinicId };
    const pipeline = [
      { $match: matchCondition },
    ];
    const employees = await dbClient.db.collection('employees').aggregate(pipeline).toArray();
    const employee = employees.find((emp) => emp._id.toString() === id);
    res.status(200).json(employee);
  },

  getIndex: async (req, res) => {
    // query by type and page number for pagination
    const clinicId = req.session.clinic.id;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    const skip = page * 10;
    const matchCondition = { clinicId };
    const pipeline = [
      { $match: matchCondition },
      { $skip: skip },
      { $limit: 10 },
    ];
    const employees = await dbClient.db.collection('employees').aggregate(pipeline).toArray();
    res.status(200).json(employees);
  },

  getEmployeeLogIn: (req, res) => {
    res.send('Employee Login Page');
  },

  postEmployeeLogIn: async (req, res) => {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    // validate email and password
    if (!email) {
      res.status(400).json({ error: 'email required' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'password required' });
      return;
    }

    // authenticate login
    // check if clinic exists in db
    try {
      const employee = await dbClient.findEmp(email);
      if (!employee) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      const isValid = utils.checkPassword(password, employee.password);
      if (!isValid) {
        res.status(401).json({ message: 'check email or password' });
        return;
      }
      // store employee session as object within clinic session
      req.session.clinic.employee = {
        id: employee._id.toString(),
        name: employee.name,
      };
      res.status(201).json({ message: 'Employee log in success' });
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  getEmployee: (req, res) => {
    res.send(`Welcome ${req.session.clinic.employee.name}`);
  },

  postLogOut: (req, res) => {
    if (!req.session.clinic && !req.session.clinic.employee) {
      res.status(404).json({ error: 'Not found' });
    }
    delete req.session.clinic.employee;
    res.redirect('/api/v1/clinic/dashboard');
  },
};

module.exports = empController;
