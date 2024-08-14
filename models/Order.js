const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user: {type: String, required: true},
  orderItems: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      pricing: { type: Number, required: true },
      shippingCost: {type: Number, required: true},
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      __v: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentInfo: {
    cardNumber: { type: String, required: true },
    paymentMethod: { type: String, required: true }
  },
  totalPrice: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
