import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Payment } from "./Payment"
import { ColumnNumericTransformer } from "../data-source"

@Entity("contracts")
export class Contract {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    document_number: string

    @Column()
    date: Date

    @Column('numeric', {
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
      })
    total_value: number

    @Column('numeric', {
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
      })
    down_payment: number

    @Column('numeric', {
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
      })
    financed_amount: number

    @OneToMany(() => Payment, payment => payment.contract)
    payments: Payment[];
}