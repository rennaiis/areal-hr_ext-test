import { 
    Column, 
    Entity, 
    OneToOne, 
    OneToMany,
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn 
} from "typeorm";
import { Employee } from "../../employee/entities/employee.entity";
import { HrOperation } from "../../hr_operation/entities/hr_operation.entity";
import { HistoryItem } from "../../history_items/entities/history_item.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 100 })
    last_name: string;

    @Column({ type: 'varchar', length: 100 })
    first_name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    middle_name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    login: string;

    @Column({ type: 'text' })
    password_hash: string;

    @Column({
        type: 'enum',
        enum: ['admin', 'hr_manager'],
        default: 'hr_manager'
    })
    role: string;

    @OneToOne(() => Employee, (employee) => employee.user)
    employee: Employee;

    @OneToMany(() => HistoryItem, (item) => item.user)
    history_items: HistoryItem[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
