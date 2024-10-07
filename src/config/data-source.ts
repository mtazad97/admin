import { DataSource } from 'typeorm';
import { User } from '../models/User';  // Import the User entity

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1997',
    database: process.env.DB_NAME || 'teaching',
    synchronize: true,
    entities: [User],
});