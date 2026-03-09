const Customer = require('../models/customerModel');
const Order = require('../models/orderModel');

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve customers', error: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ status: 'error', message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer by ID:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve customer', error: error.message });
    }
};

exports.getCustomerOrders = async (req, res) => {
    try {
        const orders = await Order.findByCustomerId(req.params.id);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve customer orders', error: error.message });
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        if (!name || !email) {
            return res.status(400).json({ status: 'error', message: 'Name and email are required' });
        }

        const newCustomerId = await Customer.create({ name, email, phone, address });
        res.status(201).json({ status: 'success', message: 'Customer created successfully', id: newCustomerId });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ status: 'error', message: 'Failed to create customer', error: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const affectedRows = await Customer.update(req.params.id, { name, email, phone, address });

        if (affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Customer not found or no changes made' });
        }

        res.status(200).json({ status: 'success', message: 'Customer updated successfully' });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ status: 'error', message: 'Failed to update customer', error: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const affectedRows = await Customer.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Customer not found' });
        }
        res.status(200).json({ status: 'success', message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ status: 'error', message: 'Failed to delete customer', error: error.message });
    }
};
