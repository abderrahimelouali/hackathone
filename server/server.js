import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes (to be created)
import activityRoutes from './routes/activities.js';
import bookingRoutes from './routes/bookings.js';
import stayRoutes from './routes/stays.js';
import transportRoutes from './routes/transports.js';
import productRoutes from './routes/products.js';
import blogRoutes from './routes/blogs.js';
import authRoutes from './routes/auth.js';
import mapLocationRoutes from './routes/mapLocations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use('/api/activities', activityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/stays', stayRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/map-locations', mapLocationRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Experiencia API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/experiencia')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT} (all interfaces)`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
