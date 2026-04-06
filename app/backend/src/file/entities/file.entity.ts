import { 
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    Column
 } from "typeorm";
import { Passport } from "../../passport/entities/passport.entity";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    file_id: number

    @ManyToOne(()=>Passport, (passport)=>passport.files)
    passport: Passport

    @Column({
        type: 'varchar',
        length: 300
    })
    name: string

    @Column({
        type: 'varchar',
        length: 500
    })
    file_path: string

    @CreateDateColumn()
    created_at: Date
    
    @DeleteDateColumn()
    deleted_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
    
}
