import dbClient from '../config/db';
import utils from '../utils/utils';

const clinicController = {
  postNew: async (req, res) => {
    const name = req.body ? req.body.name : null;
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    if (!name) {
      res.status(400).json({ error: 'Clinic Name is missing' });
      return;
    }
    if (!email) {
      res.status(400).json({ error: 'Clinic Email is missing' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Clinic Password is missing' });
      return;
    }

    try {
      // check if clinic exists
      const existingClinic = await dbClient.findClinic(email);
      if (!existingClinic) {
        await dbClient.createClinic(name, email, password);
        const newClinic = await dbClient.findClinic(email);
        console.log('New clinic created:', newClinic._id.toString());
        res.status(201).json({ id: newClinic._id.toString(), email: newClinic.email });
      } else {
        res.status(400).json({ error: 'Clinic Already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  postClinic: async (req, res) => {
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
      const clinic = await dbClient.findClinic(email);
      if (!clinic) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      const isValid = utils.checkPassword(password, clinic.password);
      if (!isValid) {
        res.status(401).json({ message: 'check email or password' });
        return;
      }
      // store clinic session
      req.session.user = {
        id: clinic._id.toString(),
        name: clinic.name,
      };
      // redirect to /dashboard
      res.redirect('/api/v1/dashboard');
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  getClinic: async (req, res) => {
    res.send(`Welcome ${req.session.user.name}`);
  },

  getStats: async (req, res) => {
    const countEmployees = await dbClient.nbEmployees();
    const countPatients = await dbClient.nbPatients();
    res.status(200).json({ Employees: countEmployees, Patients: countPatients });
  },
};

module.exports = clinicController;
