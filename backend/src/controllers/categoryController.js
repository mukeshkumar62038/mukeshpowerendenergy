import Category from '../models/Category.js';
import { isMongoConnected, getDatabase, saveDatabase } from '../config/db.js';

export const getCategories = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
      return res.json({
        success: true,
        count: categories.length,
        categories,
        storage: 'mongodb'
      });
    }

    const db = getDatabase();
    return res.json({
      success: true,
      count: db.categories.length,
      categories: db.categories,
      storage: 'local'
    });
  } catch (err) {
    console.error('getCategories error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const newCategoryData = {
      id: 'cat-' + Date.now().toString().slice(-6),
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      count: 0,
      createdAt: new Date().toISOString()
    };

    let savedCategory = newCategoryData;

    if (isMongoConnected()) {
      try {
        const doc = await Category.create(newCategoryData);
        savedCategory = doc.toJSON();
      } catch (mErr) {
        console.error('MongoDB Category create error:', mErr.message);
      }
    }

    try {
      const db = getDatabase();
      db.categories = db.categories || [];
      db.categories.push(savedCategory);
      saveDatabase(db);
    } catch (e) {}

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category: savedCategory,
      storage: isMongoConnected() ? 'mongodb' : 'local'
    });
  } catch (err) {
    console.error('createCategory error:', err);
    return res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      await Category.findOneAndDelete({ id });
    }

    const db = getDatabase();
    db.categories = db.categories.filter(c => c.id !== id);
    saveDatabase(db);

    return res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    console.error('deleteCategory error:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};

export default {
  getCategories,
  createCategory,
  deleteCategory
};
