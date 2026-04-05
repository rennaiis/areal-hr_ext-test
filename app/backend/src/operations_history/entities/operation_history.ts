import { 
    Column,
    CreateDateColumn,
    Entity, 
    OneToOne, 
    PrimaryGeneratedColumn
} from "typeorm";
import { operationObjectType } from "./operationObjectType";
import { HrOperation } from "../../hr_operation/entities/hr_operation.entity";

@Entity()
export class OperationsHistory {
    @PrimaryGeneratedColumn()
    operation_id: number
    
    @CreateDateColumn()
    operation_time: Date

    @OneToOne(()=>HrOperation, (operation)=>operation.operation_id)
    hr_operation: HrOperation

    @Column({
        type: 'enum',
        enum: operationObjectType,
    })
    operation_object: operationObjectType

    @Column({
        type: 'varchar',
        length: 50
    })
    field_name: string

    @Column({
        type: 'varchar',
        length: 300
    })
    old_value: string

    @Column({
        type: 'varchar',
        length: 300
    })
    new_value: string


}