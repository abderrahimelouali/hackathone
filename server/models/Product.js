import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleFr: { type: String },
  titleEn: { type: String },
  description: { type: String, required: true },
  descriptionFr: { type: String },
  descriptionEn: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  hostId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
