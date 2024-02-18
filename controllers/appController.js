import dbClient from '../config/db';

const appController = {
  getStatus: (req, res) => {
    try {
      const dbAlive = dbClient.isAlive();
      res.status(200).json({ db: dbAlive });
    } catch (err) {
      res.status(500).json({ Server: `${err}` });
    }
  },

  getStats: async (req, res) => {
    try {
      const countClinics = await dbClient.nbClinics();
      const countEmployees = await dbClient.nbEmployees();
      const countPatients = await dbClient.nbPatients();
      // await dbClient.deleteAllClinics();
      res.status(200).json({
        clinics: countClinics,
        employees: countEmployees,
        patients: countPatients,
      });
    } catch (err) {
      res.status(500).json({ Server: `${err}` });
    }
  },

  getSignUp: (req, res) => {
    res.send('Register Clinic');
  },

  getLogIn: (req, res) => {
    res.send('Clinic LogIn')
  },

  postLogOut: (req, res) => {
    // Destroy the session to log the clinic out
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out:', err);
        res.status(500).json({ error: 'Failed to log out' });
      } else {
        // Redirect the user to the login page or send a success message
        res.redirect('/api/v1/auth/login');
      }
    });
  },
};

module.exports = appController;
