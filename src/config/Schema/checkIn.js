const mongoose = require('mongoose');

/**
 * Examination is imported to be a subdocument in
 * the checkInSchema
 */

const { ObjectId } = mongoose.Schema.Types;

const checkInSchema = new mongoose.Schema({
  patient: {
    type: ObjectId,
    ref: 'Patient',
    required: true,
  },
  visitDate: {
    type: Date,
    default: Date.now,
  },
  visitType: {
    type: String,
    enum: ['NEW', 'REVIEW', 'REPORT'],
    default: 'NEW',
    required: true,
  },
  billing: {
    type: String,
    required: true,
  },
  examination: {
    type: ObjectId,
    ref: 'Examination',
  },
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
