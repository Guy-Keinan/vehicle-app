import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    licensePlate: string;

    @Column()
    manufacturer: string;

    @Column()
    model: string;

    @Column({ default: 'active' })
    status: 'active' | 'inactive';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
