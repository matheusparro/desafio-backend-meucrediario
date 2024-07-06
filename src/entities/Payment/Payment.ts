import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { Contract } from "../Contract/Contract";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn("uuid")
    id: string;  // Use string para uuid

    @Column()
    due_amount: number;  // valorvencimento

    @Column()
    due_date: Date;  // datavencimento

    @Column()
    last_payment_date: Date;  // dataultimopagamento

    @Column()
    total_paid: number;  // totalpago

    @Column()
    outstanding_principal: number;  // capitalaberto

    @ManyToOne(() => Contract, contract => contract.payments)
    contract: Contract;  // Use objeto em vez de ID
}