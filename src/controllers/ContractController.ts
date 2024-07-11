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
        errors
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
        error
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      let { page, size, document_number } = req.query;

      page = page ? parseInt(page as string, 10) : 1; // Converte para número e define valor padrão 1 se não estiver definido
      size = size ? parseInt(size as string, 10) : 10; // Converte para número e define valor padrão 10 se não estiver definido
      document_number = document_number as string | undefined; // Mantém como string ou undefined se não estiver definido

      const contractService = new ContractService();
      const contracts = await contractService.findAll(page, size);

      return res.status(200).json(contracts);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        error
      });
    }
  }

  async findPaymentsByContractId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const contractService = new ContractService();
      const payments = await contractService.findPaymentsByContractId(id);

      return res.status(200).json(payments);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        error
      });
    }
  }
}
