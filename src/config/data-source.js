"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User"); // Import the User entity
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1997',
    database: process.env.DB_NAME || 'teaching',
    synchronize: true,
    entities: [User_1.User],
});
