import Examination from './examination';

const mongoose = require('mongoose');

/**
 * Examination is imported to be a subdocument in
 * the checkInSchema
 */

const { ObjectId } = mongoose.Schema.Types;

const checkInSchema = new mongoose.Schema({
  patientId: {
    type: ObjectId,
    ref: 'Patient',
    required: true,
  },
  visitDate: {
    type: Date,
    default: Date.now,
  },
  examination: {
    type: Examination,
    required: false,
  },
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
