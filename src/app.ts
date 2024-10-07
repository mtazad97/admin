// src/app.ts or src/index.ts

import express from 'express';
import session from 'express-session';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './config/data-source';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Initialize data source for TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret', // Use an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));

// Use routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


