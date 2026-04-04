const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../../backend/src/models/userModel');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../backend/.env') });

async function createUser() {
    try {
        console.log(`Connecting to MongoDB...`);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const username = 'Madhu';
        const email = 'madhu@gmail.com';
        const password = '123';
        const role = 'Admin';

        // Check if exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log('User already exists');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.create({
                username,
                email,
                password_hash: hashedPassword,
                role
            });
            console.log('User created: madhu@gmail.com / 123');
        }

    } catch (err) {
        console.error('Error creating user:', err.message);
    } finally {
        await mongoose.connection.close();
    }
}

createUser();
