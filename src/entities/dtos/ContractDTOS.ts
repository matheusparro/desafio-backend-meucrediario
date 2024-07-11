
import { IPaymentDTO } from './IPaymentDTO';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Contract } from '../Contract';

export interface IContractRequestDTO {
    document_number: string;
    date: Date;
    total_value: number;
    down_payment: number;
    financed_amount: number;
    payments: IPaymentDTO[];
}

export interface IContractResponseDTO {
    id: string;
    document_number: string;
    date: Date;
    total_value: number;
    down_payment: number;
    financed_amount: number;
    payments: IPaymentDTO[];
}


export class ParcelaDTO {
  @IsNumber()
  valorvencimento: number;

  datavencimento: Date;

  dataultimopagamento: Date;

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

  data: Date;

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

export interface IContractPaginationDTO {
  contracts: Contract[];
  totalPage: number;
}

