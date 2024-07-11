import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Contract } from './Contract';
import { ColumnNumericTransformer } from '../data-source';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;  // Use string para uuid

    @Column('numeric', {
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer()
      })
    due_amount: number;  // valorvencimento

    @Column()
    due_date: Date;  // datavencimento

    @Column({ nullable: true })
    last_payment_date: Date;  // dataultimopagamento

    @Column('numeric', {
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer()
      })
    total_paid: number;  // totalpago

    @Column('numeric', {
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer()
      })
    outstanding_principal: number;  // capitalaberto

    @ManyToOne(() => Contract, contract => contract.payments)
    contract: Contract;  // Use objeto em vez de ID
}