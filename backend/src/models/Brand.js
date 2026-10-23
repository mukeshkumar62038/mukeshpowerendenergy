import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
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
      unique: true,
      trim: true
    },
    category: {
      type: String,
      default: 'Electrical Supplies',
      trim: true
    },
    image: {
      type: String,
      default: '/images/brands/polycab.png'
    },
    badge: {
      type: String,
      default: 'Authorised Partner'
    },
    productsCount: {
      type: String,
      default: '10+ Items'
    },
    tagline: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'Active'
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

const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema);

export default Brand;
