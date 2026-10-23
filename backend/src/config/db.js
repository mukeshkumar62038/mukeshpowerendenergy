import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';
import Enquiry from '../models/Enquiry.js';
import User from '../models/User.js';

import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, '../../.env');
dotenv.config({ path: ENV_PATH });

const DATA_DIR = path.join(__dirname, '../../data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

// Fix for Windows / ISP DNS SRV lookup ECONNREFUSED with mongodb+srv://
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore in case environment restricts custom DNS
}

export const INITIAL_DATA = {
  users: process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD
    ? [{
        id: 'usr_admin_1',
        name: 'Mukesh Admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
        createdAt: new Date().toISOString()
      }]
    : [],
  enquiries: [],
  categories: [
    { id: 'cat-1', name: 'Wires & Cables', slug: 'wires', count: 12 },
    { id: 'cat-2', name: 'Modular Switches', slug: 'switches', count: 15 },
    { id: 'cat-3', name: 'MCBs & DBs', slug: 'switchgear', count: 10 },
    { id: 'cat-4', name: 'LED Lighting', slug: 'lights', count: 18 },
    { id: 'cat-5', name: 'Fans & Geysers', slug: 'appliances', count: 8 },
    { id: 'cat-6', name: 'Conduit & Boxes', slug: 'conduit', count: 9 },
    { id: 'cat-7', name: 'Project Packages', slug: 'bundles', count: 4 }
  ],
  brands: [
    { id: 'br-1', name: 'Polycab', category: 'Wires & Cables', image: '/images/brands/polycab.png', badge: 'Master Distributor', productsCount: '120+ Items', status: 'Active' },
    { id: 'br-2', name: 'Havells', category: 'Switchgear & Appliances', image: '/images/brands/havells.png', badge: 'Authorised Stockist', productsCount: '95+ Items', status: 'Active' },
    { id: 'br-3', name: 'Anchor by Panasonic', category: 'Modular Switches & Conduits', image: '/images/brands/anchor.png', badge: 'Official Stockist', productsCount: '80+ Items', status: 'Active' },
    { id: 'br-4', name: 'KEI Wires', category: 'Wires & Cables', image: '/images/brands/kei.png', badge: 'Authorised Dealer', productsCount: '60+ Items', status: 'Active' },
    { id: 'br-5', name: 'Legrand', category: 'Luxury Switches & DBs', image: '/images/brands/legrand.png', badge: 'Project Partner', productsCount: '70+ Items', status: 'Active' },
    { id: 'br-6', name: 'Crompton', category: 'Fans & Lighting', image: '/images/brands/crompton.png', badge: 'Authorised Dealer', productsCount: '45+ Items', status: 'Active' },
    { id: 'br-7', name: 'Jaquar Lighting', category: 'Architectural Lighting', image: '/images/brands/jaquar.png', badge: 'Exclusive Partner', productsCount: '50+ Items', status: 'Active' },
    { id: 'br-8', name: 'Schneider / ABB', category: 'Industrial Switchgears', image: '/images/brands/abb.png', badge: 'Industrial Supplier', productsCount: '40+ Items', status: 'Active' },
    { id: 'br-9', name: 'Usha', category: 'Fans & Home Appliances', image: '/images/brands/usha.png', badge: 'Authorised Dealer', productsCount: '35+ Items', status: 'Active' },
    { id: 'br-10', name: 'Bajaj', category: 'Fans & Geysers', image: '/images/brands/bajaj.png', badge: 'Authorised Stockist', productsCount: '30+ Items', status: 'Active' },
    { id: 'br-11', name: 'Wipro', category: 'LED Lighting', image: '/images/brands/wipro.png', badge: 'Commercial Partner', productsCount: '40+ Items', status: 'Active' },
    { id: 'br-12', name: 'UltraTech', category: 'Conduit & Enclosures', image: '/images/brands/ultratech.png', badge: 'Structural Partner', productsCount: '25+ Items', status: 'Active' }
  ],
  products: [
    {
      id: 'prod-1',
      title: 'Polycab FR-LSH Single Core House Wires (90m)',
      name: 'Polycab FR-LSH Single Core House Wires (90m)',
      slug: 'polycab-fr-lsh-single-core-house-wires',
      category: 'Wires & Cables',
      brand: 'Polycab',
      image: '/images/products/wires.png',
      badge: '100% Copper',
      price: '₹1,450 / coil',
      startingPrice: '₹1,450 / coil',
      stockStatus: 'In Stock',
      specs: '0.75 sq mm to 10 sq mm, Flame Retardant Low Smoke, 1100V Grade',
      shortDescription: 'Industrial grade 100% electrolytic annealed copper wire with high oxygen index.',
      fullDescription: 'High quality Polycab FR-LSH single core copper PVC insulated flexible wire suitable for household and commercial electrification.',
      featured: true,
      isFeatured: true
    },
    {
      id: 'prod-2',
      title: 'Anchor Roma Modular Switches & Sockets (10A/25A)',
      name: 'Anchor Roma Modular Switches & Sockets (10A/25A)',
      slug: 'anchor-roma-modular-switches-and-sockets',
      category: 'Modular Switches',
      brand: 'Anchor by Panasonic',
      image: '/images/products/switches.png',
      badge: '25A Heavy Duty',
      price: '₹45 / switch',
      startingPrice: '₹45 / switch',
      stockStatus: 'In Stock',
      specs: 'Polycarbonate flame proof body, silver contact tips, 100k clicks',
      shortDescription: 'Classic white modular plate switches with silver alloy contacts for smooth toggle.',
      fullDescription: 'Panasonic Anchor Roma series offers unmatched durability and sleek aesthetics for all residential spaces.',
      featured: true,
      isFeatured: true
    },
    {
      id: 'prod-3',
      title: 'Heavy Gauge Galvanized GI Metal Gang Boxes',
      name: 'Heavy Gauge Galvanized GI Metal Gang Boxes',
      slug: 'heavy-gauge-galvanized-gi-metal-gang-boxes',
      category: 'Conduit & Boxes',
      brand: 'Polycab',
      image: '/images/products/metal-concealed.png',
      badge: 'Rust Proof',
      price: '₹35 / box',
      startingPrice: '₹35 / box',
      stockStatus: 'In Stock',
      specs: '1 Module to 18 Module, 16/18 gauge zinc-coated sheet with brass earthing',
      shortDescription: 'Deep drawn concealed metal boxes for wall flush installation with earthing screw.',
      fullDescription: 'Heavy-duty zinc galvanized sheet box designed to resist corrosion in mortar and concrete.',
      featured: true,
      isFeatured: true
    },
    {
      id: 'prod-4',
      title: 'Havells Miniature Circuit Breakers (MCB) & SPN DBs',
      name: 'Havells Miniature Circuit Breakers (MCB) & SPN DBs',
      slug: 'havells-miniature-circuit-breakers-mcb',
      category: 'MCBs & DBs',
      brand: 'Havells',
      image: '/images/products/mcb.png',
      badge: '10kA Breaking',
      price: '₹185 / pole',
      startingPrice: '₹185 / pole',
      stockStatus: 'In Stock',
      specs: 'Single Pole, Double Pole, Isolators & RCCB, 10kA breaking capacity',
      shortDescription: 'Overload and short-circuit protection with 10kA breaking capacity for safety.',
      fullDescription: 'Havells Euroload MCBs feature bi-connect terminals and trip indicators for residential distribution boards.',
      featured: true,
      isFeatured: true
    },
    {
      id: 'prod-5',
      title: 'Jaquar Slim LED Surface & Recessed Downlights',
      name: 'Jaquar Slim LED Surface & Recessed Downlights',
      slug: 'jaquar-slim-led-surface-recessed-downlights',
      category: 'LED Lighting',
      brand: 'Jaquar Lighting',
      image: '/images/products/light.png',
      badge: 'Up to 50,000 Hrs',
      price: '₹320 / unit',
      startingPrice: '₹320 / unit',
      stockStatus: 'In Stock',
      specs: '3W to 24W, 3000K Warm / 6500K Cool Day, Surge protection 4kV',
      shortDescription: 'Slim architectural round downlights with high lumens per watt and anti-glare diffuser.',
      fullDescription: 'Premium Jaquar LED lighting engineered for long life and modern interiors.',
      featured: true,
      isFeatured: true
    },
    {
      id: 'prod-6',
      title: 'Crompton Energion BLDC 28W High Speed Ceiling Fan',
      name: 'Crompton Energion BLDC 28W High Speed Ceiling Fan',
      slug: 'crompton-energion-bldc-28w-ceiling-fan',
      category: 'Fans & Geysers',
      brand: 'Crompton',
      image: '/images/products/fans-geysers.png',
      badge: 'Save 65% Power',
      price: '₹2,850 / pc',
      startingPrice: '₹2,850 / pc',
      stockStatus: 'In Stock',
      specs: '5-Star BEE energy efficient, smart RF remote control, silent motor',
      shortDescription: 'BLDC motor saves up to 65% power, operates seamlessly on low voltage.',
      fullDescription: 'Crompton Energion delivers high air delivery with whisper-quiet operation and intelligent remote.',
      featured: true,
      isFeatured: true
    }
  ]
};

let mongoConnected = false;

// Check MongoDB Connection Status
export const isMongoConnected = () => {
  return mongoConnected && mongoose.connection.readyState === 1;
};

// Seed initial data into MongoDB Atlas if collections are empty
const seedMongoDataIfEmpty = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('🌱 Seeding initial products to MongoDB Atlas...');
      await Product.insertMany(INITIAL_DATA.products);
      console.log(`✅ Seeded ${INITIAL_DATA.products.length} products to MongoDB Atlas!`);
    }

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(INITIAL_DATA.categories);
      console.log(`✅ Seeded ${INITIAL_DATA.categories.length} categories to MongoDB Atlas!`);
    }

    const brandCount = await Brand.countDocuments();
    if (brandCount === 0) {
      await Brand.insertMany(INITIAL_DATA.brands);
      console.log(`✅ Seeded ${INITIAL_DATA.brands.length} brands to MongoDB Atlas!`);
    }

    const enquiryCount = await Enquiry.countDocuments();
    if (enquiryCount === 0) {
      await Enquiry.insertMany(INITIAL_DATA.enquiries);
      console.log(`✅ Seeded ${INITIAL_DATA.enquiries.length} sample enquiries to MongoDB Atlas!`);
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(INITIAL_DATA.users);
      console.log(`✅ Seeded admin user to MongoDB Atlas!`);
    }
  } catch (seedErr) {
    console.error('⚠️ Seeding error:', seedErr.message);
  }
};

// Initialize MongoDB Atlas connection
export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('⚠️ MONGODB_URI not found in .env. Using file-based storage.');
    mongoConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000
    });
    mongoConnected = true;
    console.log(`=================================================`);
    console.log(`🍃 MongoDB Atlas Connected Successfully!`);
    console.log(`📡 Cluster Host: ${conn.connection.host}`);
    console.log(`🗄️  Database Name: ${conn.connection.name}`);
    console.log(`=================================================`);

    // Run auto seed
    await seedMongoDataIfEmpty();
    return true;
  } catch (err) {
    mongoConnected = false;
    console.error(`❌ MongoDB Atlas Connection Failed: ${err.message}`);
    console.warn(`🔄 Falling back to persistent local store (backend/data/store.json)`);
    return false;
  }
};

// Ensure data folder and file exists (Local JSON Store fallback)
export const getDatabase = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
    return INITIAL_DATA;
  }

  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading store.json, re-initializing:', err);
    fs.writeFileSync(STORE_PATH, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
    return INITIAL_DATA;
  }
};

export const saveDatabase = (data) => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

export default {
  connectDatabase,
  isMongoConnected,
  getDatabase,
  saveDatabase,
  INITIAL_DATA
};
