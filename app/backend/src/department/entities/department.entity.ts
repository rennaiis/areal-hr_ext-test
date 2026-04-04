import {
    Entity, 
    Tree, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
    TreeParent,
    TreeChildren
}from 'typeorm'
import { Organization } from '../../organization/entities/organization.entity';

@Entity('departments')
@Tree('materialized-path')
export class Department {
    @PrimaryGeneratedColumn({
        name: 'department_id'
    })
    department_id: number;

    @Column({
        type: 'varchar', 
        length: 150 })
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

    @ManyToOne(() => Organization, (org) => org.departments)
    @JoinColumn({ name: 'organization_id' }) 
    organization: Organization;

    @TreeParent()
    @JoinColumn({ name: 'parent_department_id' })
        parent_department: Department;

    @TreeChildren()
        children: Department[]
}