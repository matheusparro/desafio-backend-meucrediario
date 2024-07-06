import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Contract {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    document_number: string

    @Column()
    data: string

    @Column()
    valor_total: number

    @Column()
    valor_entrada: number

    @Column()
    valor_financiado: number
}