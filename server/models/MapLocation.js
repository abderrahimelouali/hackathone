import mongoose from 'mongoose';

const mapLocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameFr: { type: String },
  nameEn: { type: String },
  type: { 
    type: String, 
    enum: ["nature", "heritage", "shopping", "culture", "adventure"],
    required: true 
  },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  emoji: { type: String, default: "📍" },
  description: { type: String },
  descriptionFr: { type: String },
  descriptionEn: { type: String },
  hostId: { type: String } // Optional: track who added it
}, { timestamps: true });

export default mongoose.model('MapLocation', mapLocationSchema);
