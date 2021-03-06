import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product { 

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id?: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    price: number;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    status: number;

    @ApiProperty()
    @Column()
    quantity: number;

    @ApiProperty()
    @Column()
    friendly_url: string;

    @ApiProperty()
    @Column()
    image: string;

    @CreateDateColumn()
    @ApiProperty()
    created_at?: Date;
    
    @UpdateDateColumn()
    @ApiProperty()
    updated_at?: Date;
}
