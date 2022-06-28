const Customers = require('../../models/customers/customers.model');
const Orders = require('../../models/orders/orders.model');

const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customers.find({})
            .populate('order')
            .populate('ordersHistory');
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
}

const createCustomer = async (req, res, next) => {
    try {
        if (req.body.rankingPoints) {
            req.body.exchangeablePoints = req.body.rankingPoints;

            if (req.body.rankingPoints < 100) {
                req.body.ranking = 'Silver';
            } else if (req.body.rankingPoints < 500) {
                req.body.ranking = 'Gold';
            } else if (req.body.rankingPoints < 1000) {
                req.body.ranking = 'Platinum';
            } else {
                req.body.ranking = 'Diamond';
            }
        }

        const customer = await Customers.create(req.body);
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const customer = await Customers.findByIdAndDelete(req.params.customerId);
        await Orders.deleteMany({ _id: { $in: customer.ordersHistory } });
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (err) {
        next(err);
    }
}

const editCustomer = async (req, res, next) => {
    try {
        const customer = await Customers.findByIdAndUpdate(req.params.customerId, {
            $set: req.body
        }, {
            new: true
        })
            .populate('order')
            .populate('ordersHistory');

        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (err) {
        next(err);
    }
}

const getCustomer = async (req, res, next) => {
    try {
        const customer = await Customers.findById(req.params.customerId).populate('order').populate('ordersHistory');
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllCustomers,
    editCustomer,
    deleteCustomer,
    createCustomer,
    getCustomer
}