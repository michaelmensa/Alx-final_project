import dbClient from '../config/db';

const patientController = {
  postNew: async (req, res) => {
    const firstName = req.body ? req.body.firstName : null;
    const lastName = req.body ? req.body.lastName : null;
    const dob = req.body ? req.body.dob : null;
    const occupation = req.body ? req.body.occupation : null;
    if (!firstName) {
      res.status(400).json({ error: 'Patient FirstName is missing' });
      return;
    }
    if (!lastName) {
      res.status(400).json({ error: 'Patient LastEmail is missing' });
      return;
    }
    if (!dob) {
      res.status(400).json({ error: 'Patient DOB is missing' });
      return;
    }
    if (!occupation) {
      res.status(400).json({ error: 'Patient Occupation is missing' });
      return;
    }

    try {
      // check if clinic exists
      const existingPatient = await dbClient.findPatient(firstName);
      if (!existingPatient) {
        await dbClient.createPatient(firstName, lastName, dob, occupation);
        const newPatient = await dbClient.findPatient(firstName);
        console.log('new Patient created:', newPatient._id.toString());
        res.status(201).json({ id: newPatient._id.toString(), fullName: newPatient.fullName });
      } else {
        res.status(400).json({ error: 'Patient Already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },
};

module.exports = patientController;
