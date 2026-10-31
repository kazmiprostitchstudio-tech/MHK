import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  totalOrders: { type: Number, default: 0 },
  pendingBalance: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema);
