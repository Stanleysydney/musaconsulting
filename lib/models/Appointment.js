import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
    reference: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 120, index: true },
    phone: { type: String, trim: true, maxlength: 24 },
    service: { type: String, required: true, trim: true },
    slot: { type: Date, required: true, index: true },
    preferredContact: { type: String, enum: ["email", "phone", "video"], default: "email" },
    notes: { type: String, required: true, trim: true, maxlength: 1200 },
    status: {
      type: String,
      enum: ["requested", "confirmed", "cancelled", "completed"],
      default: "requested",
      index: true
    },
    source: { type: String, default: "website" },
    metadata: {
      ipHash: String,
      userAgent: String
    }
  },
  { timestamps: true }
);

AppointmentSchema.index({ email: 1, slot: 1 });

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
