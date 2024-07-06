import { getRepository } from "typeorm";
import { Contract } from "../entities/Contract";
import { ContratosDataDTO, IContractRequestDTO, IContractResponseDTO } from "../entities/Contract/dto/ContractDTOS";
import { Payment } from "../entities/Payment";
import { contractRepository } from "../repositories/Contract";
import { paymentRepository } from "../repositories/Payment";

export class ContractService {
    async execute(contratosDTO: ContratosDataDTO): Promise<void> {
        
        // Criar um novo contrato
        for (const contratoDTO of contratosDTO.contratos) {
            // Criar nova instância do contrato
        
            let contract = await contractRepository.findOne({where:{
                document_number: contratoDTO.contrato
            }});
            if(contract){
                continue;
            }
            contract = new Contract();
            contract.document_number = contratoDTO.contrato;
            contract.date = contratoDTO.data;
            contract.total_value = contratoDTO.valortotal;
            contract.down_payment = contratoDTO.valorentrada;
            contract.financed_amount = contratoDTO.valorfinanciado;
            // Mapear os pagamentos
            contract.payments = contratoDTO.parcelas.map(parcela => {
              const payment = new Payment();
              payment.due_amount = parcela.valorvencimento;
              payment.due_date = new Date(parcela.datavencimento);
              payment.last_payment_date = new Date(parcela.dataultimopagamento);
              payment.total_paid = parcela.totalpago;
              payment.outstanding_principal = parcela.capitalaberto;
              return payment;
            });
      
            // Salvar o contrato e seus pagamentos no banco de dados
            await contractRepository.save(contract);
            
            // Salvar pagamentos separados e adicionar ao contrato
            contract.payments = await Promise.all(
              contract.payments.map(async payment => {
                payment.contract = contract;
                return await paymentRepository.save(payment);
              })
            );
          }
    }
}
