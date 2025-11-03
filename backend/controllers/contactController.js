import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/emailService.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    // Send email notification
    try {
      await sendContactEmail({
        name,
        email,
        subject,
        message
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Continue even if email fails
    }

    res.status(201).json({
      status: 'success',
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
export const getAllContacts = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update contact status
// @route   PATCH /api/contact/:id/status
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
