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
};

module.exports = appController;
