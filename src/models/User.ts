// src/models/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;  // Use '!' to ignore the error (TypeORM will handle this)

    @Column({ unique: true })
    email : string;

    @Column()
    password!: string;

    @Column()
    fname : string;

    @Column()
    lname : string;

    @Column({ nullable: true })
    number?: string;  // Mark this as optional if it's nullable

    @Column({ nullable: true, type: 'date' })
    dob: Date | null;  // Allow null values

    @Column({ default: false })
    isAdmin : boolean;

}
