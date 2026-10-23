import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    brand: {
      type: String,
      default: 'Mukesh Power',
      trim: true,
      index: true
    },
    price: {
      type: String,
      default: '₹0.00',
      trim: true
    },
    startingPrice: {
      type: String,
      default: 'Wholesale Rate On Request',
      trim: true
    },
    stockStatus: {
      type: String,
      default: 'In Stock',
      enum: ['In Stock', 'Out of Stock', 'Pre-Order', 'Low Stock']
    },
    featured: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    badge: {
      type: String,
      default: 'Certified'
    },
    shortDescription: {
      type: String,
      default: '',
      trim: true
    },
    subtitle: {
      type: String,
      default: '',
      trim: true
    },
    fullDescription: {
      type: String,
      default: '',
      trim: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    image: {
      type: String,
      default: '/images/products/wires.png'
    },
    galleryImages: {
      type: [String],
      default: []
    },
    specs: {
      type: String,
      default: ''
    },
    brands: {
      type: [String],
      default: ['Mukesh Power']
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

productSchema.index({ title: 'text', description: 'text', category: 'text', brand: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
