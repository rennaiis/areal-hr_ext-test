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
import { User } from "../../user/entities/user.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    employee_id: number

    @OneToOne(()=>Passport, (passport)=>passport.employee)
    @JoinColumn({name: 'passport_id'})
    passport: Passport 

    @Column()
    passport_id: number

    @OneToOne(()=>Adress, (adress)=>adress.employee)
    adress: Adress

    @OneToMany(()=>HrOperation, (operation)=>operation.employee)
    hr_operations: HrOperation[]

    @OneToOne(() => User, (user) => user.employee)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ nullable: true })
    user_id: number;

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
    
    @CreateDateColumn()
    created_at: Date

    @DeleteDateColumn()
    deleted_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
}
