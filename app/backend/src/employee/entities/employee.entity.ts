import { 
    Column,
    Entity, 
    JoinColumn, 
    OneToOne, 
    PrimaryGeneratedColumn,
    CreateDateColumn, 
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";
import { Passport } from "../../passport/entities/passport.entity";
import { Adress } from "../../adress/entities/adress.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    employee_id

    @OneToOne(()=>Passport, (passport)=>passport.employee)
    passport: Passport

    @OneToOne(()=>Adress, (adress)=>adress.employee)
    @JoinColumn({name: 'adress_id'})
    adress: Adress

    @Column({
        type: 'varchar',
        length: 100
    })
    last_name: string

    @Column({
        type: 'varchar',
        length: 100
    })
    first_name: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    middle_name: string

    @Column({
        type: "date"
    })
    birth_date: Date
    
}
