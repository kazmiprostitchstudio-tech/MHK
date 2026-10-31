import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
  machineNumber: { type: String, required: true, unique: true }, // e.g., Machine-01
  model: { type: String, required: true },
  headCount: { type: Number, required: true },
  status: { type: String, enum: ['Running', 'Idle', 'Maintenance'], default: 'Idle' },
  maintenanceLogs: [{
    date: { type: Date, default: Date.now },
    issue: { type: String },
    cost: { type: Number, default: 0 }
  }]
}, { timestamps: true });import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
  machineNumber: { type: String, required: true, unique: true }, // e.g., Machine-01
  model: { type: String, required: true },
  headCount: { type: Number, required: true },
  status: { type: String, enum: ['Running', 'Idle', 'Maintenance'], default: 'Idle' },
  maintenanceLogs: [{
    date: { type: Date, default: Date.now },
    issue: { type: String },
    cost: { type: Number, default: 0 }
  }]
}, { timestamps: true });

export default mongoose.models.Machine || mongoose.model('Machine', machineSchema);

export default mongoose.models.Machine || mongoose.model('Machine', machineSchema);