import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleFr: { type: String, required: true },
  titleEn: { type: String, required: true },
  excerpt: { type: String, required: true },
  excerptFr: { type: String, required: true },
  excerptEn: { type: String, required: true },
  content: { type: String, required: true },
  contentFr: { type: String, required: true },
  contentEn: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('BlogPost', blogPostSchema);
