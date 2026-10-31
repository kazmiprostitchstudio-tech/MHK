import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'Employee', 'Customer', 'Designer'],
    default: 'Employee'
  },
  status: { type: String, enum: ['Active', 'Suspended'], default: 'Active' }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);