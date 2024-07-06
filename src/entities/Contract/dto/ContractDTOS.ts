
import { IPaymentDTO } from "../../Payment/dto/IPaymentDTO";
import { IsArray, IsDateString, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export interface IContractRequestDTO {
    document_number: string;
    date: string;
    total_value: number;
    down_payment: number;
    financed_amount: number;
    payments: IPaymentDTO[];
}

export interface IContractResponseDTO {
    id: string;
    document_number: string;
    date: string;
    total_value: number;
    down_payment: number;
    financed_amount: number;
    payments: IPaymentDTO[];
}


export class ParcelaDTO {
  @IsNumber()
  valorvencimento: number;

  @IsDateString()
  datavencimento: string;

  @IsDateString()
  dataultimopagamento: string;

  @IsNumber()
  totalpago: number;

  @IsNumber()
  capitalaberto: number;
}

export class ContratoDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParcelaDTO)
  parcelas: ParcelaDTO[];

  @IsString()
  contrato: string;

  @IsDateString()
  data: string;

  @IsNumber()
  valortotal: number;

  @IsNumber()
  valorentrada: number;

  @IsNumber()
  valorfinanciado: number;
}

export class ContratosDataDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContratoDTO)
  contratos: ContratoDTO[];
}
