import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/experiencia');
    const users = await User.find({});
    console.log(`Found ${users.length} users.`);
    for (const user of users) {
      const isMatch = await bcrypt.compare("123456", user.password);
      console.log(`User: ${user.email}, Role: ${user.role}, Password Match: ${isMatch}`);
    }
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkUsers();
