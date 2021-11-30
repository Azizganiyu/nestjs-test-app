import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number;

    @ApiProperty()
    @Column()
    product_id: number;

    @ApiProperty()
    @Column()
    amount: number;

    @ApiProperty()
    @Column()
    payment_url: string;

    @ApiProperty()
    @Column()
    reference?: string;

    @ApiProperty()
    @Column()
    status: number;

    @CreateDateColumn()
    @ApiProperty()
    created_at?: Date;
    
    @UpdateDateColumn()
    @ApiProperty()
    updated_at?: Date;

}
