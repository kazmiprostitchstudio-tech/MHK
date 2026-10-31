import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  cnic: { type: String, required: true, unique: true },
  role: { type: String, required: true }, // e.g., Machine Operator, Digitizer, Helper
  phone: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  endingDate: { type: Date, default: null },
  payType: { type: String, enum: ['Monthly', 'PieceRate'], default: 'Monthly' },
  ratePerThousandStitches: { type: Number, default: 0 },
  baseSalary: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Resigned', 'Terminated'], default: 'Active' },
  experienceLetterGenerated: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);