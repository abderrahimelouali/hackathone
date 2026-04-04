import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  date: { type: Date, required: true },
  persons: { type: Number, required: true },
  status: { type: String, enum: ["مؤكد", "قيد الانتظار", "ملغى"], default: "قيد الانتظار" }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
