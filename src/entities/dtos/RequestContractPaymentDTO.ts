import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

export class RequestContractPaymentDTO {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    contractIds: string[];
}
