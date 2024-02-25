const mongoose = require('mongoose');

/**
 * we create subdocuments for each section of the examination form
 * we that add the sudocuments as fields in the examination schema
 * we after creating the examination schema, we import the suddocument
 * to the checkin schema.
 */

// 1. creating visualAcuitySchema
const eyeVisualAcuitySchema = new mongoose.Schema({
  unaidedDistanceVA: String,
  pinholeDistanceVA: String,
  aidedDistanceVA: String,
  unaidedNearVA: String,
  aidedNearVA: String,
});

// main schema to add to examination schema
const visualAcuitySchema = new mongoose.Schema({
  rightEye: eyeVisualAcuitySchema,
  leftEye: eyeVisualAcuitySchema,
  bothEyes: eyeVisualAcuitySchema,
});

// 2. medicalSegmentSchema
const medicalSegmentSchema = new mongoose.Schema({
  bloodPressure: String,
  bloodGlucose: String,
  pulse: String,
  weight: String,
  height: String,
});

// 3. creating anteriorSegmentSchema
const eyeAnteriorSegmentSchema = new mongoose.Schema({
  ocularAdnexa: String,
  lidsLashes: String,
  conjunctiva: String,
  cornea: String,
  anteriorChamber: String,
  iris: String,
  pupil: String,
  lens: String,
  anteriorVitreous: String,
  tonometry: String,
});

// main subdocument to add to examinationSchema
const anteriorSegmentSchema = new mongoose.Schema({
  rightEye: eyeAnteriorSegmentSchema,
  leftEye: eyeAnteriorSegmentSchema,
});

// 4 creating posteriorSegmentSchema
const eyePosteriorSegmentSchema = new mongoose.Schema({
  vitreous: String,
  opticDisc: String,
  cupDiscRatio: String,
  macula: String,
  bloodVessels: String,
  peripheryRetina: String,
});

// main subdocument to add to examinationSchema
const posteriorSegmentSchema = new mongoose.Schema({
  rightEye: eyePosteriorSegmentSchema,
  leftEye: eyePosteriorSegmentSchema,
});

// 5 creating refractionSchema
const eyeRefractionSchema = new mongoose.Schema({
  oldRefraction: String,
  retinoscopy: String,
  autoRefraction: String,
  subjectiveRefraction: String,
});

// main subdocument to add to examinationSchema
const refractionSchema = new mongoose.Schema({
  rightEye: eyeRefractionSchema,
  leftEye: eyeRefractionSchema,
});

// 6 diagnosisSchema
const diagnosisSchema = new mongoose.Schema({
  diagnosis: String,
  diagnosisType: {
    type: String,
    enum: ['NEW', 'REVIEW', 'RESOLVED'],
    default: 'NEW',
  },
  diagnosisStatus: {
    type: String,
    enum: ['FINAL', 'QUERIED'],
    default: 'FINAL',
  },
  affectedEye: {
    type: String,
    enum: ['RE', 'LE', 'BE', 'NONE'],
    default: 'BE',
  },
});

// 7 drugTreatmentSchema
const drugTreatmentSchema = new mongoose.Schema({
  medication: String,
});

// 8 spectaclePrescription
const eyeSpectaclePrescription = new mongoose.Schema({
  sphere: String,
  cylinder: String,
  Axis: String,
  distanceVisualAcuity: String,
});

// main for examination schema
const spectaclePrescription = new mongoose.Schema({
  rightEye: eyeSpectaclePrescription,
  leftEye: eyeSpectaclePrescription,
  bothEyesAcuity: String,
  readingAddition: String,
});

const examinationSchema = new mongoose.Schema({
  visualAcuityExam: { type: visualAcuitySchema, required: false },
  medicalExam: { type: medicalSegmentSchema, required: false },
  anteriorExam: { type: anteriorSegmentSchema, required: false },
  posteriorExam: { type: posteriorSegmentSchema, required: false },
  refraction: { type: refractionSchema, required: false },
  diagnosis: { type: [diagnosisSchema], required: true },
  medication: { type: [drugTreatmentSchema], required: false },
  lensRx: { type: spectaclePrescription, required: false },
});

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = Examination;
