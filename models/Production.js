import mongoose from 'mongoose';

const productionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  jobOrderNo: { type: String, required: true },
  designName: { type: String, required: true },
  stitchCount: { type: Number, required: true },
  machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
  operator: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  totalStitchesRun: { type: Number, required: true },
  totalGarments: { type: Number, required: true },
  shift: { type: String, enum: ['Day', 'Night'], default: 'Day' }
}, { timestamps: true });

export default mongoose.models.Production || mongoose.model('Production', productionSchema);