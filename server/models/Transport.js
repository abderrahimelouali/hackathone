import mongoose from 'mongoose';

const transportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleFr: { type: String },
  titleEn: { type: String },
  type: { type: String, enum: ["كراء سيارة", "نقل سياحي"], required: true },
  description: { type: String, required: true },
  descriptionFr: { type: String },
  descriptionEn: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Transport', transportSchema);
