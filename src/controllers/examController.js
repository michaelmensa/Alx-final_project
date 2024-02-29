import Patient from '../config/Schema/patient';
import Examination from '../config/Schema/examination';
import utils from '../utils/utils';
/**
 * examController contains:
 * GET examform to get examination form to be filled.
 *
 * POST examform to submit exam form to be stored in db
 */

const examController = {
  getExamForm: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ error: 'ID param not found' });
    }
    const patient = await Patient.findById(id);
    
    res.render('examForm', {
      Id: patient._id,
      PatientID: patient.patientID,
      Name: `${patient.firstName} ${patient.lastName}`,
      Age: utils.calculateAge(patient.dOB) + 'years',
      Gender: patient.gender,
      Contact: patient.contact,
      Occupation: patient.occupation,
    });
  },

  postExamForm: async (req, res) => {
    const patientId = req.params.id;
   const { examination } = req.body;

    if (!examination) {
      res.status(404).json({ error: 'Examination cannot be empty' });
      return;
    }
    try {
      const exam = await Examination.create({
        examination,
      });
      const patient = await Patient.findById(patientId);
      patient.examinations.push(exam);
      console.log(patient.examinations);
      await patient.save();

      res.redirect('/employee/dashboard');
    } catch (err) {
      res.status(500).json({ error: 'Could not save exam' });
    }
  },
};

module.exports = examController;
