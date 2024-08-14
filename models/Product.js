const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricing: { type: Number, required: true },
  shippingCost: {type : Number, required: true},
  image: { type: String, required: true },
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
