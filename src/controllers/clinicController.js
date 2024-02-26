import Clinic from '../config/Schema/clinic';
import Employee from '../config/Schema/employee';
import Patient from '../config/Schema/patient';
import utils from '../utils/utils';

const clinicController = {
  // creates new Clinic
  postNew: async (req, res) => {
    const clinicName = req.body ? req.body.name : null;
    const clinicEmail = req.body ? req.body.email : null;
    const contact = req.body ? req.body.mobile : null;
    const location = req.body ? req.body.location : null;
    const password = req.body ? req.body.password : null;
    const retypePassword = req.body ? req.body.repassword : null;
    if (!clinicName) {
      res.status(400).json({ error: 'Clinic Name is missing' });
      return;
    }
    if (!clinicEmail) {
      res.status(400).json({ error: 'Clinic Email is missing' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Clinic Password is missing' });
      return;
    }
    if (!retypePassword) {
      res.status(400).json({ error: 'retypePassword is missing' });
      return;
    }

    if (password !== retypePassword) {
      res.json('Passwords do not match');
    }

    const clinicPassword = utils.hashPassword(password);

    try {
      // check if clinic exists
      const existingClinic = await Clinic.findOne({ $or: [{ clinicName }, { clinicEmail }] });
      if (!existingClinic) {
        const newClinic = await Clinic.create({
          clinicName,
          contact,
          location,
          clinicEmail,
          clinicPassword });
        console.log('New clinic created:', newClinic._id.toString());
        res.redirect('/login');
      } else {
        res.status(400).json({ error: 'Clinic Already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  postClinic: async (req, res) => {
    const clinicEmail = req.body ? req.body.email : null;
    const clinicPassword = req.body ? req.body.password : null;

    // validate email and password
    if (!clinicEmail) {
      res.status(400).json({ error: 'email required' });
      return;
    }
    if (!clinicPassword) {
      res.status(400).json({ error: 'password required' });
      return;
    }

    // authenticate login
    // check if clinic exists in db
    try {
      const clinic = await Clinic.findOne({ clinicEmail });
      if (!clinic) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      const isValid = utils.checkPassword(clinicPassword, clinic.clinicPassword);
      if (!isValid) {
        res.status(401).json({ message: 'check email or password' });
        return;
      }
      // store clinic session
      req.session.clinic = {
        id: clinic._id.toString(),
        name: clinic.clinicName,
        contact: clinic.contact,
        location: clinic.location,
      };
      // redirect to /dashboard
      res.redirect('/clinic/dashboard');
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  // gets clinic dashboard
  getClinic: async (req, res) => {
    if (!req.session.clinic || !req.session) {
      res.redirect('/');
      return;
    }
    const clinicName = req.session.clinic.name;
    const clinicContact = req.session.clinic.contact;
    const clinicLocation = req.session.clinic.location;
    res.render('dashboard', {
      clinicName,
      clinicContact,
      clinicLocation,
    });
  },

  getStats: async (req, res) => {
    const clinicId = req.session.clinic.id;
    try {
      const employeeCount = await Employee.countDocuments({ clinicId });
      const patientCount = await Patient.countDocuments({ clinicId });
      res.status(200).json({
        Employees: employeeCount,
        Patients: patientCount,
      });
    } catch (err) {
      console.log('Failed to retrieve employee count', err);
      res.status(500).json({ error: 'Failed' });
    }
  },
};

module.exports = clinicController;
