import { 
    Entity, 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
 } from "typeorm";

@Entity()
export class Adress {
    @PrimaryGeneratedColumn()
    employee_id: number

    @Column({
        type: 'varchar',
        length: 150
    })
    region: string

    @Column({
        type: 'varchar',
        length: 150
    })
    settlement: string
    
    @Column({
        type: 'varchar',
        length: 150
    })
    street: string

    @Column({
        type: 'varchar',
        length: 15
    })
    house: string

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true
    })
    apartment: string

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true
    })
    building: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}


