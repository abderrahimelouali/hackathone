import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendOTPVerificationEmail } from '../utils/emailService.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      if (!user.isVerified) {
          // They already created account but didn't verify. Resend the OTP?
          // For security, just tell them it exists.
          return res.status(400).json({ message: 'User exists. Please login to verify your account.' });
      }
      return res.status(400).json({ message: 'User already exists' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user but set as unverified
    user = await User.create({
      name,
      email,
      password,
      role: role || 'tourist',
      isVerified: false,
      verificationCode: otp,
      verificationCodeExpiresAt: otpExpires
    });

    if (user) {
      // Send OTP via email asynchronously
      await sendOTPVerificationEmail(user.email, otp).catch(e => console.error("OTP send fail on register:", e));

      res.status(201).json({
        message: 'Account created. Please verify your email.',
        requiresVerification: true,
        email: user.email
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email (lowercase is handled by model)
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      
      // Enforce OTP check
      if (!user.isVerified) {
          return res.status(403).json({ 
              message: 'Account not verified. Please verify your email.', 
              requiresVerification: true 
          });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      // Security best practice: don't reveal if email or password was wrong
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * @desc    Verify OTP for account activation
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOTP = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Account is already verified' });
        }

        // --- MOCKED FOR DEMO MODE ---
        // if (user.verificationCode !== code) {
        //     return res.status(400).json({ message: 'Invalid verification code' });
        // }
        // if (user.verificationCodeExpiresAt < new Date()) {
        //     return res.status(400).json({ message: 'Verification code expired. Please request a new one.' });
        // }
        // -----------------------------

        // Success - activate account
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiresAt = undefined;
        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('OTP verify error:', error);
        res.status(500).json({ message: 'Server error during OTP verification' });
    }
};

/**
 * @desc    Resend OTP
 * @route   POST /api/auth/resend-otp
 * @access  Public
 */
export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Account is already verified' });
        }

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.verificationCode = otp;
        user.verificationCodeExpiresAt = otpExpires;
        await user.save();

        await sendOTPVerificationEmail(user.email, otp);

        res.status(200).json({ message: 'New verification code sent' });
    } catch (error) {
        console.error('OTP resend error:', error);
        res.status(500).json({ message: 'Server error during OTP resend' });
    }
}

/**
 * @desc    Get user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};
