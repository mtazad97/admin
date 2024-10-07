"use strict";
// src/app.ts or src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const data_source_1 = require("./config/data-source");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Initialize data source for TypeORM
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Session middleware
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'your_session_secret', // Use an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));
// Use routes
app.use('/api/users', userRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
