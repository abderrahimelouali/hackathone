import mongoose from 'mongoose';

const staySchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleFr: { type: String },
  titleEn: { type: String },
  type: { type: String, enum: ["فندق", "منزل"], required: true },
  description: { type: String, required: true },
  descriptionFr: { type: String },
  descriptionEn: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  amenities: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Stay', staySchema);
