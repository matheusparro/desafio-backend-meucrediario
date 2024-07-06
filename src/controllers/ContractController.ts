import { Request, Response } from 'express';
import { ContractService } from '../services/ContractService';
import { ContratosDataDTO } from '../entities/Contract/dto/ContractDTOS';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class ContractController {
  async execute(req: Request, res: Response) {
    try {
      const contratosDataDTO = plainToInstance(ContratosDataDTO, req.body);
      await validateOrReject(contratosDataDTO);

      const contractService = new ContractService();
      await contractService.execute(contratosDataDTO);

      return res.status(200).send('OK');
    } catch (errors) {
      return res.status(400).json({
        message: 'Validation failed',
        errors,
      });
    }
  }
}
