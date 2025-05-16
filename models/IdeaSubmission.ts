import mongoose from 'mongoose';

const ideaSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  referralSource: { type: String }, 
  ideaSentence: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  buildStatus: { type: String },
  validationStatus: { type: String, required: true },
  helpNeeded: { type: [String], default: [] },
  fundingStatus: { type: String, required: true },
  fundingAmount: { type: String },
  runway: { type: String, required: true },
  partnership: { type: String },
  gtm: { type: String },
  whySelect: { type: String },
  date: { type: Date, default: Date.now },
});

const IdeaSubmission = mongoose.models.IdeaSubmission || mongoose.model('IdeaSubmission', ideaSubmissionSchema);

export default IdeaSubmission;