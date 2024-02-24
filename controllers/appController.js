import Clinic from '../config/Schema/clinic';
import Employee from '../config/Schema/employee';
import Patient from '../config/Schema/patient';

const appController = {
  getStats: async (req, res) => {
    try {
      const countClinics = await Clinic.countDocuments();
      const countEmployees = await Employee.countDocuments();
      const countPatients = await Patient.countDocuments();
      res.status(200).json({
        clinics: countClinics,
        employees: countEmployees,
        patients: countPatients,
      });
    } catch (err) {
      console.log('Failed to count clinics', err);
      res.status(500).json({ Server: `${err}` });
    }
  },

  getSignUp: (req, res) => {
    res.render('register');
  },

  getLogIn: (req, res) => {
    res.render('register');
  },

  postLogOut: (req, res) => {
    // Destroy the session to log the clinic out
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out:', err);
        res.status(500).json({ error: 'Failed to log out' });
      } else {
        // Redirect the user to the login page or send a success message
        res.redirect('/');
      }
    });
  },
};

module.exports = appController;
