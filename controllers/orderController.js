const Order = require('../models/Order');

const addOrderItems = async (req, res) => {
  const { user, orderItems, shippingAddress, paymentInfo, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  const order = new Order({
    user,
    orderItems,
    shippingAddress,
    paymentInfo,
    totalPrice,
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log("Error --->", error)
    res.status(400).json({ message: 'Invalid order data' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'username email');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//module.exports = { addOrderItems, getOrderById };
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  };
  
  module.exports = { addOrderItems, getOrderById, getMyOrders };