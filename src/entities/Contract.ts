import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Payment } from "./Payment"

@Entity("contracts")
export class Contract {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    document_number: string

    @Column()
    date: string

    @Column()
    total_value: number

    @Column()
    down_payment: number

    @Column()
    financed_amount: number

    @OneToMany(() => Payment, payment => payment.contract)
    payments: Payment[];
}