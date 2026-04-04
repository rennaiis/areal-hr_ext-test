import { Department } from '../../department/entities/department.entity';
import {
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    DeleteDateColumn,
    Column, 
    OneToMany
}from 'typeorm'

@Entity('organisations')
export class Organization {
    @PrimaryGeneratedColumn()
    organization_id: number;

    @Column({
        type: 'varchar',
        length: 300
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 1000, 
        nullable: true
    })
    comment: string

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(()=>Department, (department)=>department.organization)
    departments: Department[];
}
