const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { protect, adminAuth } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.route('/')
    .get(salesController.getSales)
    .post(salesController.createSale);

router.route('/:id')
    .get(salesController.getSaleById)
    .put(salesController.updateSale)
    .delete(salesController.deleteSale);

module.exports = router;
