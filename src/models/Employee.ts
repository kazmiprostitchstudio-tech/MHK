import mongoose, { Schema, model, models } from 'mongoose';

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., Machine Operator, Helper, Supervisor
  phone: { type: String, required: true },
  machineAssigned: { type: String, default: 'Unit-1' },
  dailyStitchTarget: { type: Number, default: 50000 },
  status: { type: String, enum: ['Active', 'On Leave', 'Inactive'], default: 'Active' },
  joinedDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Employee = models.Employee || model('Employee', EmployeeSchema);
export default Employee;