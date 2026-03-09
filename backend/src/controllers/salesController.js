const Sale = require('../models/saleModel');

exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.status(200).json(sales);
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve sales data', error: error.message });
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ status: 'error', message: 'Sale record not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        console.error('Error fetching sale by ID:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve sale record', error: error.message });
    }
};

exports.createSale = async (req, res) => {
    try {
        const { product_name, category, quantity, price, sale_date } = req.body;

        // Validation
        if (!product_name || !category || quantity === undefined || price === undefined || !sale_date) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields: product_name, category, quantity, price, sale_date' });
        }

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ status: 'error', message: 'Quantity must be a positive number' });
        }

        if (isNaN(price) || price < 0) {
            return res.status(400).json({ status: 'error', message: 'Price must be a non-negative number' });
        }

        const newSaleId = await Sale.create({
            product_name,
            category,
            quantity,
            price,
            sale_date
        });

        res.status(201).json({ status: 'success', message: 'Sale created successfully', id: newSaleId });
    } catch (error) {
        console.error('Error creating sale:', error);
        res.status(500).json({ status: 'error', message: 'Failed to create sale', error: error.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const { product_name, category, quantity, price, sale_date } = req.body;

        // Validation
        if (!product_name || !category || quantity === undefined || price === undefined || !sale_date) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields for update' });
        }

        const affectedRows = await Sale.update(req.params.id, {
            product_name,
            category,
            quantity,
            price,
            sale_date
        });

        if (affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Sale record not found or no changes made' });
        }

        res.status(200).json({ status: 'success', message: 'Sale updated successfully' });
    } catch (error) {
        console.error('Error updating sale:', error);
        res.status(500).json({ status: 'error', message: 'Failed to update sale', error: error.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        const affectedRows = await Sale.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Sale record not found' });
        }
        res.status(200).json({ status: 'success', message: 'Sale deleted successfully' });
    } catch (error) {
        console.error('Error deleting sale:', error);
        res.status(500).json({ status: 'error', message: 'Failed to delete sale', error: error.message });
    }
};
