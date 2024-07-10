import { IsNumber, IsString } from "class-validator";

export class ResponseContractPaytmentsDTO {
    @IsString()
    mesAno: string;
    @IsNumber()
    valorMaximo: number;
}