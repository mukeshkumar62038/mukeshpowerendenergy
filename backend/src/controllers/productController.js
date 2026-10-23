import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { isMongoConnected, getDatabase, saveDatabase } from '../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const { category, brand, search, featured, slug } = req.query;

    if (isMongoConnected()) {
      if (slug) {
        const product = await Product.findOne({ $or: [{ slug }, { id: slug }] }).lean();
        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        return res.json({ success: true, product, storage: 'mongodb' });
      }

      const query = {};

      if (category && category !== 'all') {
        query.$or = [
          { category: { $regex: new RegExp(category, 'i') } },
          { slug: { $regex: new RegExp(category, 'i') } }
        ];
      }

      if (brand && brand !== 'all') {
        query.brand = { $regex: new RegExp(brand, 'i') };
      }

      if (featured === 'true') {
        query.$or = [{ featured: true }, { isFeatured: true }];
      }

      if (search) {
        const sRegex = { $regex: new RegExp(search, 'i') };
        query.$or = [
          { title: sRegex },
          { name: sRegex },
          { category: sRegex },
          { brand: sRegex },
          { shortDescription: sRegex },
          { specs: sRegex }
        ];
      }

      const products = await Product.find(query).sort({ createdAt: -1 }).lean();

      return res.json({
        success: true,
        count: products.length,
        products,
        storage: 'mongodb'
      });
    }

    // Local JSON Fallback
    const db = getDatabase();
    let products = [...(db.products || [])];

    if (slug) {
      const product = products.find(p => p.slug === slug || p.id === slug);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, product, storage: 'local' });
    }

    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      products = products.filter(p => {
        const pCat = (p.category || '').toLowerCase();
        const pTag = (p.tag || '').toLowerCase();
        const pSlug = (p.categorySlug || '').toLowerCase();
        return pCat.includes(catLower) || pTag.includes(catLower) || pSlug.includes(catLower);
      });
    }

    if (brand && brand !== 'all') {
      const bLower = brand.toLowerCase();
      products = products.filter(p => p.brand && p.brand.toLowerCase().includes(bLower));
    }

    if (featured === 'true') {
      products = products.filter(p => p.featured || p.isFeatured);
    }

    if (search) {
      const s = search.toLowerCase();
      products = products.filter(p =>
        (p.title && p.title.toLowerCase().includes(s)) ||
        (p.name && p.name.toLowerCase().includes(s)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(s)) ||
        (p.fullDescription && p.fullDescription.toLowerCase().includes(s)) ||
        (p.category && p.category.toLowerCase().includes(s)) ||
        (p.brand && p.brand.toLowerCase().includes(s)) ||
        (p.specs && String(p.specs).toLowerCase().includes(s))
      );
    }

    return res.json({
      success: true,
      count: products.length,
      products,
      storage: 'local'
    });
  } catch (err) {
    console.error('getProducts error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

export const getProductByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    if (isMongoConnected()) {
      const product = await Product.findOne({
        $or: [{ id: idOrSlug }, { slug: idOrSlug }]
      }).lean();

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      return res.json({ success: true, product, storage: 'mongodb' });
    }

    const db = getDatabase();
    const product = db.products.find(p => p.id === idOrSlug || p.slug === idOrSlug);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, product, storage: 'local' });
  } catch (err) {
    console.error('getProductByIdOrSlug error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      title,
      slug,
      category,
      brand,
      price,
      stockStatus,
      isFeatured,
      featured,
      shortDescription,
      fullDescription,
      description,
      image,
      galleryImages,
      specs,
      badge
    } = req.body;

    const productTitle = (name || title || '').trim();
    if (!productTitle) {
      return res.status(400).json({ success: false, message: 'Product Name is required' });
    }

    if (!category) {
      return res.status(400).json({ success: false, message: 'Product Category is required' });
    }

    // Auto-generate slug if empty
    const generatedSlug = slug && slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : productTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Format price
    let formattedPrice = price;
    if (price && !String(price).includes('₹')) {
      formattedPrice = `₹${price}`;
    }

    // Default image based on category if none provided
    let defaultImg = '/images/products/wires.png';
    const catLower = (category || '').toLowerCase();
    if (catLower.includes('switch')) defaultImg = '/images/products/switches.png';
    else if (catLower.includes('mcb') || catLower.includes('db')) defaultImg = '/images/products/mcb.png';
    else if (catLower.includes('light')) defaultImg = '/images/products/light.png';
    else if (catLower.includes('fan') || catLower.includes('geyser')) defaultImg = '/images/products/fans-geysers.png';
    else if (catLower.includes('box') || catLower.includes('conduit')) defaultImg = '/images/products/metal-concealed.png';

    const newProductData = {
      id: 'prod-' + Date.now().toString().slice(-6),
      title: productTitle,
      name: productTitle,
      slug: generatedSlug + '-' + Math.floor(100 + Math.random() * 900),
      category: category.trim(),
      brand: brand ? brand.trim() : 'Mukesh Power',
      price: formattedPrice || '₹0.00',
      startingPrice: formattedPrice || 'Wholesale Rate On Request',
      stockStatus: stockStatus || 'In Stock',
      featured: Boolean(isFeatured || featured),
      isFeatured: Boolean(isFeatured || featured),
      badge: badge || (isFeatured || featured ? 'Featured' : 'Certified'),
      shortDescription: shortDescription || '',
      subtitle: shortDescription || `${brand || 'Mukesh Power'} ${category} solutions`,
      fullDescription: fullDescription || description || '',
      description: fullDescription || description || '',
      image: image || defaultImg,
      galleryImages: Array.isArray(galleryImages) && galleryImages.length > 0 ? galleryImages : [image || defaultImg],
      specs: specs || '',
      brands: brand ? [brand.trim()] : ['Mukesh Power'],
      createdAt: new Date().toISOString()
    };

    let savedProduct = newProductData;

    // 1. Save to MongoDB if connected
    if (isMongoConnected()) {
      try {
        const mongoDoc = await Product.create(newProductData);
        savedProduct = mongoDoc.toJSON();
        console.log(`[MongoDB] New product saved: "${savedProduct.title}" (ID: ${savedProduct.id})`);

        // Increment category count if category exists
        await Category.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${category.trim()}$`, 'i') } },
          { $inc: { count: 1 } }
        ).catch(() => {});
      } catch (mErr) {
        console.error('[MongoDB Save Error]:', mErr.message);
      }
    }

    // 2. Always sync with store.json as well for high availability
    try {
      const db = getDatabase();
      db.products = db.products || [];
      db.products.unshift(savedProduct);
      saveDatabase(db);
    } catch (fsErr) {
      console.warn('Sync to store.json warning:', fsErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Product added successfully and saved to Database!',
      product: savedProduct,
      storage: isMongoConnected() ? 'mongodb' : 'local'
    });
  } catch (err) {
    console.error('createProduct error:', err);
    return res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const updated = await Product.findOneAndUpdate(
        { $or: [{ id }, { slug: id }] },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      ).lean();

      if (updated) {
        // Sync to store.json
        const db = getDatabase();
        const idx = db.products.findIndex(p => p.id === id || p.slug === id);
        if (idx !== -1) {
          db.products[idx] = { ...db.products[idx], ...updated };
          saveDatabase(db);
        }

        return res.json({
          success: true,
          message: 'Product updated successfully in Database',
          product: updated
        });
      }
    }

    const db = getDatabase();
    const index = db.products.findIndex(p => p.id === id || p.slug === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    db.products[index] = {
      ...db.products[index],
      ...req.body,
      id: db.products[index].id,
      updatedAt: new Date().toISOString()
    };

    saveDatabase(db);
    return res.json({
      success: true,
      message: 'Product updated successfully',
      product: db.products[index]
    });
  } catch (err) {
    console.error('updateProduct error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      await Product.findOneAndDelete({ $or: [{ id }, { slug: id }] });
      console.log(`[MongoDB] Product deleted: ${id}`);
    }

    const db = getDatabase();
    const initialLen = db.products.length;
    db.products = db.products.filter(p => p.id !== id && p.slug !== id);

    if (db.products.length === initialLen && !isMongoConnected()) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    saveDatabase(db);
    return res.json({ success: true, message: 'Product deleted successfully from Database' });
  } catch (err) {
    console.error('deleteProduct error:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

export default {
  getProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct
};
