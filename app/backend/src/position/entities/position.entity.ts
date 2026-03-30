import {
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    DeleteDateColumn,
    Column
}from 'typeorm'

@Entity('positions')
export class Position {
    @PrimaryGeneratedColumn()
    position_id: number;

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
