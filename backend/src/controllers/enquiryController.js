import Enquiry from '../models/Enquiry.js';
import { isMongoConnected, getDatabase, saveDatabase } from '../config/db.js';

export const getEnquiries = async (req, res) => {
  try {
    const { search, status } = req.query;

    if (isMongoConnected()) {
      const query = {};
      if (status && status !== 'All' && status !== 'All Status') {
        query.status = status;
      }
      if (search) {
        const sRegex = { $regex: new RegExp(search, 'i') };
        query.$or = [
          { name: sRegex },
          { phone: sRegex },
          { email: sRegex },
          { category: sRegex },
          { subject: sRegex }
        ];
      }

      const enquiries = await Enquiry.find(query).sort({ createdAt: -1 }).lean();
      return res.json({
        success: true,
        count: enquiries.length,
        enquiries,
        storage: 'mongodb'
      });
    }

    const db = getDatabase();
    let enquiries = [...(db.enquiries || [])];

    if (status && status !== 'All' && status !== 'All Status') {
      enquiries = enquiries.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const s = search.toLowerCase();
      enquiries = enquiries.filter(e =>
        (e.name && e.name.toLowerCase().includes(s)) ||
        (e.phone && e.phone.includes(s)) ||
        (e.email && e.email.toLowerCase().includes(s)) ||
        (e.category && e.category.toLowerCase().includes(s)) ||
        (e.subject && e.subject.toLowerCase().includes(s))
      );
    }

    enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.json({
      success: true,
      count: enquiries.length,
      enquiries,
      storage: 'local'
    });
  } catch (err) {
    console.error('getEnquiries error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch enquiries' });
  }
};

export const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, category, quantity, message, subject, formType } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone number are required' });
    }

    const newEnquiryData = {
      id: 'ENQ-' + Date.now().toString().slice(-6),
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : 'N/A',
      subject: subject || 'Product Inquiry',
      formType: formType || 'get quote',
      category: category || 'General',
      quantity: quantity || 'Not specified',
      message: message || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    let savedEnquiry = newEnquiryData;

    if (isMongoConnected()) {
      try {
        const doc = await Enquiry.create(newEnquiryData);
        savedEnquiry = doc.toJSON();
      } catch (mErr) {
        console.error('MongoDB Enquiry create error:', mErr.message);
      }
    }

    // Always sync with local store.json
    try {
      const db = getDatabase();
      db.enquiries = db.enquiries || [];
      db.enquiries.unshift(savedEnquiry);
      saveDatabase(db);
    } catch (e) {}

    return res.status(201).json({
      success: true,
      message: 'Quotation enquiry registered successfully with Mukesh Power & Energy.',
      enquiry: savedEnquiry,
      storage: isMongoConnected() ? 'mongodb' : 'local'
    });
  } catch (err) {
    console.error('createEnquiry error:', err);
    return res.status(500).json({ success: false, message: 'Failed to submit enquiry' });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isMongoConnected()) {
      const updated = await Enquiry.findOneAndUpdate(
        { id },
        { status, updatedAt: new Date() },
        { new: true }
      ).lean();

      if (updated) {
        const db = getDatabase();
        const idx = db.enquiries.findIndex(e => e.id === id);
        if (idx !== -1) {
          db.enquiries[idx].status = status;
          saveDatabase(db);
        }

        return res.json({
          success: true,
          message: 'Status updated successfully',
          enquiry: updated
        });
      }
    }

    const db = getDatabase();
    const index = db.enquiries.findIndex(e => e.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    db.enquiries[index].status = status || db.enquiries[index].status;
    db.enquiries[index].updatedAt = new Date().toISOString();
    saveDatabase(db);

    return res.json({
      success: true,
      message: 'Status updated successfully',
      enquiry: db.enquiries[index]
    });
  } catch (err) {
    console.error('updateEnquiryStatus error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      await Enquiry.findOneAndDelete({ id });
    }

    const db = getDatabase();
    const initialLen = db.enquiries.length;
    db.enquiries = db.enquiries.filter(e => e.id !== id);

    if (db.enquiries.length === initialLen && !isMongoConnected()) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    saveDatabase(db);
    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (err) {
    console.error('deleteEnquiry error:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete enquiry' });
  }
};

export default {
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
};
