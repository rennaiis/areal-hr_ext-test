import { 
    Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn
} from "typeorm";
import { ChangedTable } from "../../../../enums/ChangedTableType";
import { User } from "../../user/entities/user.entity";
@Entity()
export class HistoryItem {
    @PrimaryGeneratedColumn()
    history_item_id: number
    
    @CreateDateColumn()
    operation_time: Date

    @Column({
        type: 'integer'
    })
    target_id: number

    @Column({
        type: 'enum',
        enum: ChangedTable,
    })
    operation_object: ChangedTable

    @ManyToOne(() => User, (user) => user.history_items)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: number;


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

    @CreateDateColumn()
    created_at: Date
}
