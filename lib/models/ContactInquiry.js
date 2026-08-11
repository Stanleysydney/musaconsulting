import mongoose, { Schema } from "mongoose";

const ContactInquirySchema = new Schema(
  {
    reference: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 120 },
    topic: { type: String, enum: ["booking", "records", "billing", "general"], required: true },
    message: { type: String, required: true, trim: true, maxlength: 1200 },
    status: { type: String, enum: ["new", "closed"], default: "new" },
    metadata: {
      ipHash: String,
      userAgent: String
    }
  },
  { timestamps: true }
);

export default mongoose.models.ContactInquiry || mongoose.model("ContactInquiry", ContactInquirySchema);
