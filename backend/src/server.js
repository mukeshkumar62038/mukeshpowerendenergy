import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { connectDatabase, isMongoConnected, getDatabase } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database (Local Seed + MongoDB Atlas Connection)
getDatabase();
connectDatabase().catch(err => {
  console.error('Initial DB connection error:', err);
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoStatus = isMongoConnected();
  res.json({
    status: 'ok',
    service: 'Mukesh Power & Energy Backend API',
    database: {
      connected: mongoStatus,
      type: mongoStatus ? 'MongoDB Atlas Cloud' : 'Persistent Local Store',
      status: mongoStatus ? 'ONLINE' : 'FALLBACK_READY'
    },
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`⚡ Mukesh Power & Energy Backend Server Running!`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`🔐 Admin login configured: ${Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD)}`);
  console.log(`=================================================`);
});

export default app;
