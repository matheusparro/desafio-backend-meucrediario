export interface IPaymentDTO {
    due_amount: number;
    due_date: Date;
    last_payment_date: Date;
    total_paid: number;
    outstanding_principal: number;
}

export interface Parcela {
    valorvencimento: number;
    datavencimento: Date;
    dataultimopagamento: Date;
    totalpago: number;
    capitalaberto: number;
  }