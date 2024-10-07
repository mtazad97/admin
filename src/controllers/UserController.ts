import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registration logic
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, fname, lname, number, dob, isAdmin } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    try {
        // Check if the user already exists
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.fname = fname;
        user.lname = lname;
        user.number = number || null;
        user.dob = dob ? new Date(dob) : null;
        user.isAdmin = isAdmin || false;

        // Save the user
        await userRepository.save(user);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Login logic
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    try {
        // Find the user by email
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });

        // Set session
        req.session.user = { id: user.id, isAdmin: user.isAdmin };

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
