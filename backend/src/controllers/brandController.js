import Brand from '../models/Brand.js';
import { isMongoConnected, getDatabase, saveDatabase } from '../config/db.js';

export const getBrands = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const brands = await Brand.find({}).sort({ createdAt: -1 }).lean();
      return res.json({
        success: true,
        count: brands.length,
        brands,
        storage: 'mongodb'
      });
    }

    const db = getDatabase();
    return res.json({
      success: true,
      count: db.brands.length,
      brands: db.brands,
      storage: 'local'
    });
  } catch (err) {
    console.error('getBrands error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch brands' });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { name, category, image, badge, productsCount, tagline, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Brand name is required' });
    }

    const newBrandData = {
      id: 'br-' + Date.now().toString().slice(-6),
      name: name.trim(),
      category: category || 'Electrical Supplies',
      image: image || '/images/brands/polycab.png',
      badge: badge || 'Authorised Partner',
      productsCount: productsCount || '10+ Items',
      tagline: tagline || '',
      description: description || '',
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    let savedBrand = newBrandData;

    if (isMongoConnected()) {
      try {
        const doc = await Brand.create(newBrandData);
        savedBrand = doc.toJSON();
      } catch (mErr) {
        console.error('MongoDB Brand create error:', mErr.message);
      }
    }

    try {
      const db = getDatabase();
      db.brands = db.brands || [];
      db.brands.push(savedBrand);
      saveDatabase(db);
    } catch (e) {}

    return res.status(201).json({
      success: true,
      message: 'Brand added successfully',
      brand: savedBrand,
      storage: isMongoConnected() ? 'mongodb' : 'local'
    });
  } catch (err) {
    console.error('createBrand error:', err);
    return res.status(500).json({ success: false, message: 'Failed to add brand' });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const updated = await Brand.findOneAndUpdate(
        { id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      ).lean();

      if (updated) {
        const db = getDatabase();
        const idx = db.brands.findIndex(b => b.id === id);
        if (idx !== -1) {
          db.brands[idx] = { ...db.brands[idx], ...updated };
          saveDatabase(db);
        }

        return res.json({
          success: true,
          message: 'Brand updated successfully',
          brand: updated
        });
      }
    }

    const db = getDatabase();
    const index = db.brands.findIndex(b => b.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    db.brands[index] = {
      ...db.brands[index],
      ...req.body,
      id,
      updatedAt: new Date().toISOString()
    };

    saveDatabase(db);
    return res.json({
      success: true,
      message: 'Brand updated successfully',
      brand: db.brands[index]
    });
  } catch (err) {
    console.error('updateBrand error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update brand' });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      await Brand.findOneAndDelete({ id });
    }

    const db = getDatabase();
    const initialLen = db.brands.length;
    db.brands = db.brands.filter(b => b.id !== id);

    if (db.brands.length === initialLen && !isMongoConnected()) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    saveDatabase(db);
    return res.json({ success: true, message: 'Brand removed successfully' });
  } catch (err) {
    console.error('deleteBrand error:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete brand' });
  }
};

export default {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
};
