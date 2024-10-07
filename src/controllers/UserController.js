"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registration logic
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fname, lname, number, dob, isAdmin } = req.body;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    try {
        // Check if the user already exists
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create a new user
        const user = new User_1.User();
        user.email = email;
        user.password = hashedPassword;
        user.fname = fname;
        user.lname = lname;
        user.number = number || null;
        user.dob = dob ? new Date(dob) : null;
        user.isAdmin = isAdmin || false;
        // Save the user
        yield userRepository.save(user);
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.registerUser = registerUser;
// Login logic
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    try {
        // Find the user by email
        const user = yield userRepository.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // Check if the password matches
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, isAdmin: user.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });
        // Set session
        req.session.user = { id: user.id, isAdmin: user.isAdmin };
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.loginUser = loginUser;
