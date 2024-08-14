const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, pricing, shippingCost, image } = req.body;
    const newProduct = new Product({
      name,
      description,
      pricing,
      shippingCost,
      image,
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Update product details
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.pricing = req.body.pricing || product.pricing;
      product.shippingCost = req.body.shippingCost || product.shippingCost;
      product.image = req.body.image || product.image;

      const updatedProduct = await product.save();

      res.json({
        _id: updatedProduct._id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        pricing: updatedProduct.pricing,
        shippingCost: updatedProduct.shippingCost,
        image: updatedProduct.image,
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    console.log('Product ID:', req.params.id); // Log the ID

    const product = await Product.findById(req.params.id);
    console.log('Product Found:', product); // Log the product details

    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error); // Log the detailed error
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
