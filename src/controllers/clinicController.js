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

  // logs in a clinic
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
        res.render('custom404Clinic');
        return;
      }
      const isValid = utils.checkPassword(clinicPassword, clinic.clinicPassword);
      if (!isValid) {
        res.status(401).json({ message: 'check email or password' });
        return;
      }
      // store clinic session
      let currentDate = new Date();
      let hours = currentDate.getUTCHours();
      let minutes = currentDate.getUTCMinutes();
      console.log(currentDate, hours, minutes);
      req.session.clinic = {
        id: clinic._id.toString(),
        loginTime: hours + ':' + minutes,
      };
      // redirect to /dashboard
      res.redirect('/clinic/dashboard');
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },

  getTryAgain: (req, res) => {
    res.redirect('/login');
  },

  // gets clinic dashboard
  getClinic: async (req, res) => {
    if (!req.session.clinic || !req.session) {
      res.redirect('/');
      return;
    }
    const { id, loginTime } = req.session.clinic;
    // find clinic that is logged in
    const clinic = await Clinic.findById(id);
    const { clinicName, contact, location } = clinic;
    res.render('dashboard', {
      clinicName,
      contact,
      location,
      loginTime,
    });
  },

  getStats: async (req, res) => {
    const clinicId = req.session.clinic.id;
    try {
      let employeeCount = await Employee.countDocuments({ clinicId });
      let patientCount = await Patient.countDocuments({ clinicId });
      res.status(200).json({
        Employees: employeeCount,
        Patients: patientCount,
      });
    } catch (err) {
      console.log('Failed to retrieve employee count', err);
      res.status(500).json({ error: 'Failed' });
    }
  },

  // gets register employee form 
  getEmployeeForm: (req, res) => {
    res.render('register_employee');
  },

  // gets login employee form
  getEmployeeLogIn: (req, res) => {
    res.render('employeeLogin');
  },
};

module.exports = clinicController;
