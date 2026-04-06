import { 
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    OneToOne
} from "typeorm";
import { Employee } from "../../employee/entities/employee.entity";
import { Department } from "../../department/entities/department.entity";
import { Position } from "../../position/entities/position.entity";
import { HrOperationType } from "../../../../enums/HrOperationType";

@Entity()
export class HrOperation {
    @PrimaryGeneratedColumn()
    operation_id: number
    
    @Column({
        type: 'numeric',
        precision: 15,
        scale: 2
    })
    salary: number

    @Column({
        type: 'enum',
        enum: HrOperationType,
        default: HrOperationType.HIRE
    })
    operation_type: HrOperationType

    @ManyToOne(()=>Department, (department)=>department.department_id)
    department: Department

    @ManyToOne(()=>Position, (position)=>position.position_id)
    position: Position

    @ManyToOne(()=>Employee, (employee)=>employee.employee_id)
    employee: Employee

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @DeleteDateColumn()
    deleted_at: Date;
}
