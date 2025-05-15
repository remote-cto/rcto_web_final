
//models/Enquiry.ts
import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
