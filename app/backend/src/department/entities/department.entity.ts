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
    TreeChildren,
    OneToMany
}from 'typeorm'
import { Organization } from '../../organization/entities/organization.entity';
import { HrOperation } from '../../hr_operation/entities/hr_operation.entity';

@Entity('departments')
@Tree('materialized-path')
export class Department {
    @PrimaryGeneratedColumn()
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

    @ManyToOne(() => Organization, (organization) => organization.departments, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'organization_id'})
    organization: Organization;

    @OneToMany(()=>HrOperation, (operation)=>operation.department)
    hr_operations: HrOperation[]

    @TreeParent()
    parent_department: Department | null;

    @TreeChildren()
    children: Department[]
}