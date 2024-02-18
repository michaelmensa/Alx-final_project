import dbClient from '../config/db';

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
    const id = req.params.id || null;
    const clinicId = req.session.user.id;

    const employee = await dbClient.findEmpByField('clinic_id', clinicId);
    console.log(employee);
    if (!employee || id !== employee._id.toString()) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.status(200).json(employee);
  },

  getIndex: async (req, res) => {
    // query by type and page number for pagination
    const clinicId = req.session.user.id;
    const { type } = req.query;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    const employee = await dbClient.findEmpByField('clinicId', clinicId);
    const skip = page * 10;
    const pipeline = [
      { $match: { type: employee.type, type } },
      { $skip: skip },
      { $limit: 10 },
    ];
    const employees = await dbClient.db.collection('employees').aggregate(pipeline).toArray();
    res.status(200).json(employees);
  },
};

module.exports = empController;
