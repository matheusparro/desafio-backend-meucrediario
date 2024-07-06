import { getRepository } from "typeorm";
import { Contract } from "../entities/Contract/Contract";
import { IContractRequestDTO, IContractResponseDTO } from "../entities/Contract/dto/ContractDTOS";
import { Payment } from "../entities/Payment/Payment";

export class ContractService {
    async execute(contractDTO: IContractRequestDTO): Promise<IContractResponseDTO> {
        const contractRepository = getRepository(Contract);

        // Criar nova instância do contrato
        const contract = new Contract();
        contract.document_number = contractDTO.document_number;
        contract.date = contractDTO.date;
        contract.total_value = contractDTO.total_value;
        contract.down_payment = contractDTO.down_payment;
        contract.financed_amount = contractDTO.financed_amount;

        // Mapear os pagamentos
        contract.payments = contractDTO.payments.map(paymentDTO => {
            const payment = new Payment();
            payment.due_amount = paymentDTO.due_amount;
            payment.due_date = paymentDTO.due_date;
            payment.last_payment_date = paymentDTO.last_payment_date;
            payment.total_paid = paymentDTO.total_paid;
            payment.outstanding_principal = paymentDTO.outstanding_principal;
            return payment;
        });

        // Salvar o contrato e seus pagamentos no banco de dados
        await contractRepository.save(contract);

        // Retornar o contrato salvo
        return contract;
    }
}
