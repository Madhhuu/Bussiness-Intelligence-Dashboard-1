const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.route('/')
    .get(customerController.getCustomers)
    .post(customerController.createCustomer);

router.route('/:id/orders')
    .get(customerController.getCustomerOrders);

router.route('/:id')
    .get(customerController.getCustomerById)
    .put(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

module.exports = router;
