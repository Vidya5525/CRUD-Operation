import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have at least 4 characters"],
    },
    lastName: { 
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name should have at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },  
    number: { 
        type: String, 
        required: true 
    },
    memberShip: { 
        type: String, 
        enum: ['Gold', 'Diamond'], 
        required: true 
    },
},{timestamps: true});

const Customer = mongoose.model('Customer', CustomerSchema);

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get Single Customer
router.get("/getCustomer/:id", async (req, res) => {
    try{
       
      const customer = await Customer.findById(req.params.id)
        res.json(customer);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
    
});

// Create a new customer
router.post('/create', async (req, res) => {
    const { firstName, lastName, number, email, memberShip } = req.body;
    const customer = new Customer({ firstName, lastName, number, email, memberShip });

    try {
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a customer
router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a customer
router.delete('/deleteCustomer/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
