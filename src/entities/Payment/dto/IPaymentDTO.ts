export interface IPaymentDTO {
    due_amount: number;
    due_date: Date;
    last_payment_date: Date;
    total_paid: number;
    outstanding_principal: number;
}

export interface Parcela {
    valorvencimento: number;
    datavencimento: string;
    dataultimopagamento: string;
    totalpago: number;
    capitalaberto: number;
  }