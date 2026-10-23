import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      default: 'N/A',
      trim: true
    },
    subject: {
      type: String,
      default: 'Product Inquiry',
      trim: true
    },
    formType: {
      type: String,
      default: 'get quote',
      trim: true
    },
    category: {
      type: String,
      default: 'General',
      trim: true
    },
    quantity: {
      type: String,
      default: 'Not specified',
      trim: true
    },
    message: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Contacted', 'Resolved']
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      }
    }
  }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
