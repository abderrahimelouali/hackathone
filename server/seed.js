import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Activity from './models/Activity.js';
import Stay from './models/Stay.js';

dotenv.config();

const users = [
  { 
    name: "Ahmed Host", 
    email: "host@test.com", 
    password: "123456", 
    role: "host",
    isVerified: true
  },
  { 
    name: "Sara Tourist", 
    email: "tourist@test.com", 
    password: "123456", 
    role: "tourist",
    isVerified: true
  },
  { 
    name: "Admin User", 
    email: "admin@test.com", 
    password: "123456", 
    role: "superAdmin",
    isVerified: true 
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/experiencia';
    await mongoose.connect(mongoUri);
    console.log("Seeding database...");

    // 1. Clean Users
    try {
      await mongoose.connection.collection('users').drop();
      console.log("Users collection dropped (clearing old indices).");
    } catch (e) {
      console.log("Users collection could not be dropped (likely didn't exist).");
    }

    // 2. Insert test users with pre-save hooks (bcrypt)
    for (const u of users) {
      await User.create(u);
    }
    console.log("New test users seeded (host@test.com, tourist@test.com, admin@test.com).");

    // 3. Keep some activities and stays but clean them up if needed
    // (Optional: can add more seed data here if required)

    console.log("Database seeded successfully with clean authentication data!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDB();
