import Employee from '../config/Schema/employee';
import utils from '../utils/utils';

const empController = {
  postNew: async (req, res) => {
    const firstName = req.body ? req.body.firstName : null;
    const lastName = req.body ? req.body.lastName : null;
    const role = req.body ? req.body.role : null;
    const email = req.body ? req.body.email : null;
    const _password = req.body ? req.body.password : null;
    const clinicId = req.session.clinic.id;
    if (!firstName || !lastName) {
      res.status(400).json({ error: 'Employee Name is missing' });
      return;
    }
    if (!role) {
      res.status(400).json({ error: 'Employee role is required' });
      return;
    }
    if (!email) {
      res.status(400).json({ error: 'Employee Email is missing' });
      return;
    }
    if (!_password) {
      res.status(400).json({ error: 'Employee Password is missing' });
      return;
    }

    const password = utils.hashPassword(_password);

    try {
      // check if clinic exists
      const existingEmp = await Employee.findOne({ $or: [{ firstName }, { email }] });
      if (!existingEmp) {
        const newEmp = await Employee.create({
          firstName, lastName, role, email, password, clinicId,
        });
        console.log('New employee created:', newEmp._id.toString());
        res.status(201).json({
          id: newEmp._id.toString(),
          email: newEmp.email,
          name: `${newEmp.firstName} ${newEmp.lastName}`,
        });
      } else {
        res.status(400).json({ error: 'Employee Already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  getShow: async (req, res) => {
    // get employee by req.params.id (employee._id)
    const employeeId = req.params.id;
    const clinicId = req.session.clinic.id;
    try {
      const employee = await Employee.findById(employeeId);
      if (employee.clinicId === clinicId) {
        res.send(employee);
      }
    } catch (err) {
      res.status(500).json({ error: 'Cannot retrieve employee' });
    }
  },

  getIndex: async (req, res) => {
    // get employees and if query, get by firstName or,
    // lastName or, role and page number for pagination
    try {
      // Extract query parameters
      const {
        firstName, lastName, role, page,
      } = req.query;

      // Define query conditions based on clinicId
      const clinicId = req.session.clinic.id;
      const queryConditions = { clinicId };

      // Add additional query conditions based on provided parameters
      const orConditions = [];
      if (firstName) orConditions.push({ firstName });
      if (lastName) orConditions.push({ lastName });
      if (role) orConditions.push({ role });

      if (orConditions.length > 0) {
        queryConditions.$or = orConditions;
      }

      // Pagination
      const pageSize = 10; // Number of employees per page
      const pageNumber = parseInt(page, 10) || 1; // Current page number

      // Fetch employees based on query conditions and pagination
      const employees = await Employee.find(queryConditions)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      res.status(200).json(employees);
    } catch (err) {
      console.error('Failed to get employees:', err);
      res.status(500).json({ error: 'Failed to get employees' });
    }
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
      const employee = await Employee.findOne({ email });
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
        fName: employee.firstName,
        lName: employee.lastName,
      };
      res.status(201).json({ message: 'Employee log in success' });
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  getEmployee: (req, res) => {
    const empFirstName = req.session.clinic.employee.fName;
    const empLastName = req.session.clinic.employee.lName;
    const empFullName = `${empFirstName} ${empLastName}`;
    console.log(empFullName);
    res.send(`Welcome ${empFullName}`);
  },

  postLogOut: (req, res) => {
    if (req.session.clinic && req.session.clinic.employee) {
      delete req.session.clinic.employee;
    }
    req.session.clinic ? res.redirect('/api/v1/clinic/dashboard') : res.status(500).json({ error: 'Error' });
  },
};

module.exports = empController;
