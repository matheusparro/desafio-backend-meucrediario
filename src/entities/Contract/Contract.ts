import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Payment } from "../Payment/Payment"

export class Contract {
    @PrimaryGeneratedColumn("uuid")
    id: number

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