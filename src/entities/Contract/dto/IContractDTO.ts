import { IPaymentDTO } from "../../Payment/dto/IPaymentDTO";

export interface IContractDTO {
    document_number: string;
    date: string;
    total_value: number;
    down_payment: number;
    financed_amount: number;
    payments: IPaymentDTO[];
}