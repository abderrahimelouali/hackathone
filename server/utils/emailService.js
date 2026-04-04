import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const createTransporter = async () => {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
};

export const sendOTPVerificationEmail = async (email, otp) => {
    try {
        console.log("====================================");
        console.log("DEMO MODE: Pretending to send email.");
        console.log("OTP Email meant for: %s", email);
        console.log("Actual OTP generated: %s", otp);
        console.log("NOTE: Real SMTP sending is disabled for demo speed.");
        console.log("====================================");
        
        // Return instantly to keep UI fast for the demo
        return true;
    } catch (error) {
        console.error("Error sending OTP email: ", error);
        throw new Error("Failed to send verification email.");
    }
};
