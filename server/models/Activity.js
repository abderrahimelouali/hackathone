import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleFr: { type: String },
  titleEn: { type: String },
  description: { type: String, required: true },
  descriptionFr: { type: String },
  descriptionEn: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  durationFr: { type: String },
  durationEn: { type: String },
  hasGuide: { type: Boolean, default: false },
  image: { type: String, required: true },
  hostId: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  location: { type: String, required: true },
  locationFr: { type: String },
  locationEn: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  difficulty: { type: String },
  color: { type: String, enum: ["violet", "orange", "yellow", "green", "purple", "pink"] }
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
