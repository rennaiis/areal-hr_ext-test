import { 
    Column,
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn
} from "typeorm";
import { ChangedTable } from "../../../../enums/ChangedTableType";
@Entity()
export class HistoryItem {
    @PrimaryGeneratedColumn()
    history_item_id: number
    
    @CreateDateColumn()
    operation_time: Date

    @Column({
        type: 'number'
    })
    target_id: number

    @Column({
        type: 'enum',
        enum: ChangedTable,
    })
    operation_object: ChangedTable

    @Column({
        type: 'varchar',
        length: 50
    })
    field_name: string

    @Column({
        type: 'varchar',
        length: 300, 
        nullable: true
    })
    old_value: string

    @Column({
        type: 'varchar',
        length: 300, 
        nullable: true
    })
    new_value: string
}
