import prisma from '../config/prisma.js';
import { sendEmail, generateFormSubmissionEmail } from '../services/emailService.js';

// Create form submission
export const createFormSubmission = async (req, res) => {
  try {
    const { firstName, lastName, email, enquiryType, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !enquiryType || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Save to database
    const newSubmission = await prisma.formSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        enquiryType,
        message
      }
    });

    // Send email notification
    const emailHtml = generateFormSubmissionEmail(newSubmission);
    await sendEmail({
      subject: `New Form Submission from ${firstName} ${lastName}`,
      html: emailHtml
    });

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: newSubmission
    });
  } catch (error) {
    console.error('Error in createFormSubmission:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all form submissions
export const getAllFormSubmissions = async (req, res) => {
  try {
    const submissions = await prisma.formSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single form submission by ID
export const getFormSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const submission = await prisma.formSubmission.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Form submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
