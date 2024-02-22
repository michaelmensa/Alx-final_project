import CheckIn from '../config/Schema/checkIn';
import Patient from '../config/Schema/patient';
import Examination from '../config/Schema/examination';

/**
 * examController contains:
 * GET examform to get examination form to be filled.
 *
 * POST examform to submit exam form to be stored in db
 */

const examController = {
  getExamForm: async (req, res) => {
    const { checkInId } = req.params;
    const clinicId = req.session.clinic.id;
    try {
      const checkIn = await CheckIn.findById(checkInId);
      if (!checkIn) {
        res.status(400).json({ error: 'Patient not checkedIn' });
        return;
      }
      const { patient } = checkIn;
      const checkedInPatient = await Patient.findById(patient);
      if (!checkedInPatient || checkedInPatient.clinicId !== clinicId) {
        res.status(400).json({ error: 'Patient not found' });
        return;
      }
      const results = `Exam form for ${checkedInPatient.patientID}: ${checkedInPatient.firstName} ${checkedInPatient.lastName}`;
      res.send(results);
    } catch (err) {
      res.status(500).json({ error: `cant get form: ${err}` });
    }
  },

  postExamForm: async (req, res) => {
    const { checkInId } = req.params;
    const visualAcuityExam = req.body.visualAcuityExam || null;
    const medicalExam = req.body.medicalExam || null;
    const anteriorExam = req.body.anteriorExam || null;
    const posteriorExam = req.body.posteriorExam || null;
    const refraction = req.body.refraction || null;
    const { diagnosis } = req.body;
    const medication = req.body.medication || null;
    const lensRx = req.body.lensRx || null;
    if (!checkInId) {
      res.status(400).json({ error: 'Patient not checked in' });
      return;
    }

    if (!diagnosis) {
      res.status(404).json({ error: 'Diagnosis cannot be empty' });
      return;
    }
    try {
      const checkIn = await CheckIn.findById(checkInId);
      if (!checkIn) {
        res.status(404).json({ error: 'CheckIn Not found' });
      }
      const examination = await Examination.create({
        visualAcuityExam,
        medicalExam,
        anteriorExam,
        posteriorExam,
        refraction,
        diagnosis,
        medication,
        lensRx,
      });
      checkIn.examination = examination;
      console.log(checkIn.examination);
      await checkIn.save();

      res.send('Exams Done');
    } catch (err) {
      res.status(500).json({ error: 'Could not save exam' });
    }
  },
};

module.exports = examController;
