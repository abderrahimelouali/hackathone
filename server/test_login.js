import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { authUser } from './controllers/AuthController.js';

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/experiencia');
        console.log("Connected to MongoDB");

        const req = { body: { email: 'tourist@test.com', password: '123456' } };
        const res = {
            json: (data) => console.log("SUCCESS JSON:", data),
            status: (code) => ({
                json: (data) => console.log("STATUS JSON:", code, data)
            })
        };

        console.log("Calling authUser...");
        const originalConsoleError = console.error;
        console.error = (msg, err) => {
            originalConsoleError("CAUGHT ERROR:", msg, err);
        };
        await authUser(req, res);
        process.exit(0);
    } catch (e) {
        console.log("Fatal Error:", e);
        process.exit(1);
    }
}
run();
