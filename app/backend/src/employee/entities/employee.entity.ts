import { 
    Column,
    Entity, 
    JoinColumn, 
    OneToOne, 
    PrimaryGeneratedColumn,
    CreateDateColumn, 
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from "typeorm";
import { Passport } from "../../passport/entities/passport.entity";
import { Adress } from "../../adress/entities/adress.entity";
import { HrOperation } from "../../hr_operation/entities/hr_operation.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    employee_id: number

    @OneToOne(()=>Passport, (passport)=>passport.employee)
    passport: Passport

    @OneToOne(()=>Adress, (adress)=>adress.employee)
    adress: Adress

    @OneToMany(()=>HrOperation, (opetation)=>opetation.employee)
    hr_operations: HrOperation[]

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
