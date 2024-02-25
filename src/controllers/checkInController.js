import Patient from '../config/Schema/patient';
import CheckIn from '../config/Schema/checkIn';

const patientCheckInController = {
  // get checkIn stats
  getCheckInStats: async (req, res) => {
    try {
      // Get the current date
      const currentDate = new Date();
      const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0)); // Set time start of the day
      const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999)); // Set time end of the day

      // Retrieve check-ins for the current day
      const checkIns = await CheckIn.find({
        visitDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).sort({ visitDate: 'desc' });

      // Calculate the total number of check-ins
      const totalCheckIns = checkIns.length;

      // Return the check-ins and the total count
      res.status(200).json({ totalCheckIns });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // gets checkin route
  getCheckInIndex: (_req, res) => {
    res.send('Patient CheckIN form');
  },

  // gets checkin with params
  getCheckInShow: async (req, res) => {
    const patientId = req.params;
    const clinicId = req.session.clinic.id;
    const patient = await Patient.findById(patientId);
    if (!patient || patient.clinicId !== clinicId) {
      res.status(400).json({ error: 'Patient not found' });
      return;
    }
    res.send(`check in ${patient.firstName} ${patient.lastName} Id: ${patient.patientId}`);
  },

  postNewCheckIn: async (req, res) => {
    const patientId = req.params.id;
    const clinicId = req.session.clinic.id;
    const { visitType, billing } = req.body;
    if (!visitType || !billing) {
      res.status(400).json({ error: 'Enter required fields' });
      return;
    }
    // find and validate if patient is registered in the same clinic
    const patient = await Patient.findById(patientId);
    if (!patient || patient.clinicId !== clinicId) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    const checkIn = await CheckIn.create({ patient: patient._id, visitType, billing });
    patient.checkIns.push(checkIn);
    await patient.save();
    console.log(patient.checkIns);
    res.status(201).json({
      message: `${patient.patientID} checked in on ${checkIn.visitDate}`,
      checkIn,
    });
  },
};

module.exports = patientCheckInController;
