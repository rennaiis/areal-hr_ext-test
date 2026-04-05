import {
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    OneToMany
}from 'typeorm'
import { HrOperation } from '../../hr_operation/entities/hr_operation.entity';

@Entity('positions')
export class Position {
    @PrimaryGeneratedColumn()
    position_id: number;
    
    @OneToMany(()=>HrOperation, (opetation)=>opetation.position)
    hr_operations: HrOperation[]
    
    @Column({
        type: 'varchar', 
        length: 300
    })
    name: string

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deleted_at: Date;
}
