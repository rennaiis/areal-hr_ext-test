import { 
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
 } from "typeorm";
import { Employee } from "../../employee/entities/employee.entity";
import { File } from "../../file/entities/file.entity";
@Entity()
export class Passport {
    @PrimaryGeneratedColumn()
    passport_id: number

    @OneToOne(()=>Employee, (emp)=>emp.passport)
    employee: Employee

    @OneToMany(()=>File, (file)=>file.passport, {
        onDelete: 'CASCADE'
    })
    files: File[]

    @Column({
        type: 'varchar',
        length: 4
    })
    series: string

    @Column({
        type:'varchar',
        length: 6
    })
    number: string

    @Column({
        type: 'varchar',
        length: 500
    })
    issued_by: string

    @Column({
        type: 'date'
    })
    issue_date: Date

    @Column({
        type: 'varchar',
        length: 7
    })
    department_code: string

    @CreateDateColumn()
    created_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @UpdateDateColumn()
    updated_at: Date

}
