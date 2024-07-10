import { Request, Response } from 'express';
import { ContractService } from '../services/ContractService';
import { ContratosDataDTO } from '../entities/dtos/ContractDTOS';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RequestContractPaymentDTO } from '../entities/dtos/RequestContractPaymentDTO';

export class ContractController {
  async execute(req: Request, res: Response): Promise<Response>{
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

  async maxDebt(req: Request, res: Response): Promise<Response> {
    try {
      const contratosDataDTO = plainToInstance(RequestContractPaymentDTO, req.body);
      await validateOrReject(contratosDataDTO);

      const contractService = new ContractService();
      const response = await contractService.mostValueMonthOpen(contratosDataDTO);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        error,
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      let { page, size, document_number } = req.query; // Acessa os parâmetros via req.query

      // Verifica se os parâmetros estão definidos e se não, define valores padrão ou vazios
      page = page ? parseInt(page as string) : undefined;
      size = size ? parseInt(size as string) : undefined;
      document_number = document_number ? document_number as string : undefined;

      const contractService = new ContractService();
      const response = await contractService.findAll(page, size, document_number);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        error,
      });
    }
  }
}
