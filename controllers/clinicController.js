import Clinic from '../config/Schema/clinic';
import Employee from '../config/Schema/employee';
import Patient from '../config/Schema/patient';
import utils from '../utils/utils';

const clinicController = {
  // creates new Clinic
  postNew: async (req, res) => {
    const clinicName = req.body ? req.body.name : null;
    const clinicEmail = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
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

    const clinicPassword = utils.hashPassword(password);

    try {
      // check if clinic exists
      const existingClinic = await Clinic.findOne({ $or: [{ clinicName }, { clinicEmail }] });
      if (!existingClinic) {
        const newClinic = await Clinic.create({ clinicName, clinicEmail, clinicPassword });
        console.log('New clinic created:', newClinic._id.toString());
        res.render('success', {
          subTitle: "Success",
          subject: `${newClinic.clinicName}`,
        });
      } else {
        res.render('failure', {
          title: "Clinic already exists",
        });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  // login to clinic dashboard
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
      };
      // redirect to /dashboard
      res.redirect('/clinic/dashboard');
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  getClinic: async (req, res) => {
    if (!req.session || !req.session.clinic) {
      res.redirect('/')
    }
    const clinicName = req.session.clinic.name;
    res.render('dashboard', {
      subTitle: clinicName,
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
