import { 
    Entity, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
    PrimaryColumn,
 } from "typeorm";
import { Employee } from "../../employee/entities/employee.entity";

@Entity()
export class Adress {
    @OneToOne(()=>Employee, (employee)=>employee.adress)
    @PrimaryColumn()
    @JoinColumn({name: 'employee_id'})
    employee: Employee

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


