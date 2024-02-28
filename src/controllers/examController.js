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
    res.render('examForm');
  },

  postExamForm: async (req, res) => {
   const { examination, patientID } = req.body;

    if (!examination) {
      res.status(404).json({ error: 'Examination cannot be empty' });
      return;
    }
    try {
      const exam = await Examination.create({
        examination,
      });
      const patient = await Patient.findOne({ patientID });
      patient.examinations = exam;
      console.log(patient.examinations);
      await patient.save();

      res.send('Exams Done');
    } catch (err) {
      res.status(500).json({ error: 'Could not save exam' });
    }
  },
};

module.exports = examController;
