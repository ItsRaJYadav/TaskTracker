import userModel from "../models/User.js";
import Otp from '../models/OTP.js'
import ContactForm from '../models/ContactForm.js'
import { hashPassword, comparePassword } from "../utils/Helper.js";
import JWT from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  })
);



export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    const verificationToken = uuidv4();
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      verificationToken,

    }).save();

    const mailOptions = {
      from: process.env.EMAIL_SENDER, // Retrieve the email sender from .env file
      to: email,
      subject: "Email Verification",
      html: `
      <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background-color: #fff; padding: 20px; border-radius: 4px;">
        <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Email Verification</h2>
        <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Dear ${name},</p>
        <p style="color: #333; font-size: 16px;">Thank you for registering. Please verify your email by clicking on the "Verify Email" button below:</p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.BASE_URL}/verify-email/${verificationToken}" style="background-color: #4caf50; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
        </div>
        <p style="color: #333; font-size: 16px;">Alternatively, you can use the following link:</p>
        <p style="color: #333; font-size: 16px;"><a href="${process.env.BASE_URL}/verify-email/${verificationToken}" style="color: #4caf50;">${process.env.BASE_URL}/verify-email/${verificationToken}</a></p>
      </div>
    </div>
    
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Failed to send verification email" });
      } else {
        res.status(200).json({ success: true, message: "Register success Check your mail box" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email & then try to login again",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
   
    //jwt token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avtar: user.avatarUrl,
        isAdmin: user.isAdmin,

      },

      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
}

export const testController = (req, res) => {
  res.send("hello to the world");
}

export const allUsersController = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

// Delete a user
export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user from the database
    await userModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Update user information
export const updateUserController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, password } = req.body;

    // Find the user in the database
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user fields
    user.name = name;
    user.email = email;

    if (password) {
      user.password = password;
    }

    // Save the updated user
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};


// Controller to update user profile
export const updateProfileController = async (req, res) => {
  const { name, phone, avatarUrl, about, bannerUrl } = req.body;
  const userId = req.user._id;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user profile
    user.name = name;
    user.phone = phone;
    user.avatarUrl = avatarUrl;
    user.bannerUrl = bannerUrl;

    user.about = about;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Controller to get all user information
export const getUserInfoController = async (req, res) => {
  const userId = req.user._id;

  try {
    // Find the user by their ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return all user information
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ error: "Failed to fetch user information" });
  }
};



export const ForgetPasswordController = async (req, res) => {
  const { email } = req.body;
  const response = {};

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const otpCode = Math.floor(100000 + Math.random() * 900000);
      const OTPData = new Otp({
        email,
        code: otpCode,
        expiredIn: new Date().getTime() + 300 * 1000,
      });

      await OTPData.save();

      response.statusText = "success";
      response.message = "OTP sent to your email";

      // Sending OTP to the user's email
      const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "OTP for Password Reset",
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
        <p style="text-align: left; font-size: 18px; font-weight: bold;">Hi ${user.name},</p>
        <p style="text-align: left; font-size: 16px; ;">We have received a request to reset your password. If you didn't initiate this request, please ignore this email. No further action is needed.</p>
        <div style="border: 2px solid #333; padding: 10px; background-color: #f7f7f7; display: inline-block; margin: 0 auto; text-align: center;">
          <h3 style="margin: 0; font-size: 24px;">OTP: ${otpCode}</h3>
        </div>
        <p style="margin-top: 10px; text-align: left; font-size: 16px;">Please use the above OTP to update or reset your password. This OTP will expire in 5 minutes.</p>
        <p style="text-align: left; font-size: 16px">Thank you,</p>
        <p style="text-align: left;font-size: 16px">The TaskTracker team</p>
      </div>
        `,
      };




      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error: ", error);
        } else {
          console.log("Email sent successfully!");
        }
      });
    } else {
      response.statusText = "error";
      response.message = "This email is not registered with us";
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};



export const updatePasswordController = async (req, res) => {
  const { email, otpCode, password } = req.body;
  const response = {};

  try {
    let userData = await userModel.findOne({ email });

    if (!userData) {
      const otpCode = Math.floor(100000 + Math.random() * 900000);
      const OTPData = new Otp({
        email,
        code: otpCode,
        expiredIn: new Date().getTime() + 300 * 1000,
      });

      await OTPData.save();

      response.statusText = 'success';
      response.message = 'OTP sent to your email for registration.';
      res.status(200).json(response);
    } else {
      let currentTime = new Date().getTime();
      let otpData = await Otp.findOne({ email, code: otpCode });

      if (otpData) {
        if (otpData.expiredIn < currentTime) {
          response.statusText = 'error';
          response.message = 'Token expired';
        } else {
          const hashedPassword = await hashPassword(password);

          userData.password = hashedPassword;
          await userData.save();

          response.statusText = 'success';
          response.message = 'Password changed successfully';
        }
      } else {
        response.statusText = 'error';
        response.message = 'Invalid OTP';
      }

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
}



export const verifyUserController = async (req, res) => {
  const token = req.params.token;

  try {
    const user = await userModel.findOne({ verificationToken: token });

    if (user) {
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
      res.status(200).json({ success: true, message: "Email verified successfully" });
    } else {
      res.status(404).json({ success: false, message: "Invalid verification token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}



export const ContactFormController = async(req, res) =>{
  try {
    const { name, subject, email, message } = req.body;
    const contactForm = new ContactForm({
      name,
      subject,
      email,
      message,
    });

    const savedForm = await contactForm.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);

    res.status(500).json({ error: 'Error submitting form' });
  }
}