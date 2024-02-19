import Patient from '../config/Schema/patient';

const patientController = {
  postNew: async (req, res) => {
    const firstName = req.body ? req.body.firstName : null;
    const lastName = req.body ? req.body.lastName : null;
    const gender = req.body ? req.body.gender : null;
    const phoneNumber = req.body ? req.body.phoneNumber : null;
    const profession = req.body ? req.body.profession : null;
    const clinicId = req.session.clinic.id;
    if (!firstName || !lastName) {
      res.status(400).json({ error: 'Patient Name is missing' });
      return;
    }
    if (!gender) {
      res.status(400).json({ error: 'Choose Gender' });
      return;
    }
    if (!phoneNumber) {
      res.status(400).json({ error: 'Patient phoneNumber is missing' });
      return;
    }
    if (!profession) {
      res.status(400).json({ error: 'Patient Profession is missing' });
      return;
    }

    try {
      // check if clinic exists
      const existingPatient = await Patient.findOne({ $or: [{ firstName }, { lastName }] });
      if (!existingPatient) {
        const patient = await Patient.create({
          firstName, lastName, gender, phoneNumber, profession, clinicId,
        });
        console.log('new Patient created:', patient._id.toString());
        res.status(201).json({
          id: patient._id.toString(),
          fullName: `${patient.firstName} ${patient.lastName}`,
        });
      } else {
        res.status(400).json({ error: 'Patient Already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },
};

module.exports = patientController;
