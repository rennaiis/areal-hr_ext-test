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
import { OperationType } from "./operationType";
import { Department } from "../../department/entities/department.entity";
import { Position } from "../../position/entities/position.entity";
import { OperationsHistory } from "../../operations_history/entities/operation_history";

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
        enum: OperationType,
        default: OperationType.HIRE
    })
    operation_type: OperationType

    @OneToOne(()=>OperationsHistory, (operation)=>operation.hr_operation)
    hist_operation: OperationsHistory

    @ManyToOne(()=>Department, (department)=>department.department_id)
    @JoinColumn({name: 'department_id'})
    department: Department

    @ManyToOne(()=>Position, (position)=>position.position_id)
    @JoinColumn({name: 'position_id'})
    position: Position

    @ManyToOne(()=>Employee, (employee)=>employee.employee_id)

    @JoinColumn({name: 'employee_id'})

    employee: Employee
    @CreateDateColumn()

    created_at: Date;
    @UpdateDateColumn()
    
    updated_at: Date;
    @DeleteDateColumn()
    deleted_at: Date;
}
