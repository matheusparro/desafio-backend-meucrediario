import { In } from 'typeorm';
import { Contract } from '../entities/Contract';
import { ContratosDataDTO, IContractPaginationDTO } from '../entities/dtos/ContractDTOS';
import { Payment } from '../entities/Payment';
import { contractRepository } from '../repositories/Contract';
import { paymentRepository } from '../repositories/Payment';
import { ResponseContractPaytmentsDTO } from '../entities/dtos/ResponseContractPaytmentsDTO';
import { RequestContractPaymentDTO } from '../entities/dtos/RequestContractPaymentDTO';

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
          payment.last_payment_date = parcela.dataultimopagamento ? new Date(parcela.dataultimopagamento): null;
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

  async mostValueMonthOpen({contractIds}:RequestContractPaymentDTO): Promise<ResponseContractPaytmentsDTO> {
    const groupedContracts = await this.groupContractsByMonth();
    const payments = await paymentRepository.find();
    let lastValue = 0;
    Object.keys(groupedContracts).forEach(monthYear => {
      groupedContracts[monthYear].totalValue += lastValue; // Adiciona o lastValue acumulado

      // Filtra e atualiza os pagamentos
      const updatedPayments = payments.filter(payment => {
          if (payment.last_payment_date &&
              payment.last_payment_date.getMonth() + 1 <= groupedContracts[monthYear].month &&
              payment.last_payment_date.getFullYear() <= groupedContracts[monthYear].year) {
              groupedContracts[monthYear].totalValue -= payment.total_paid;
              return false; // Remove este pagamento da lista
          }
          return true; // Mantém este pagamento na lista
      });

      // Atualiza a lista de pagamentos para a próxima iteração
      payments.length = 0; // Limpa o array original
      payments.push(...updatedPayments); // Atualiza com os pagamentos filtrados

      lastValue = groupedContracts[monthYear].totalValue; // Atualiza lastValue para o próximo mês/ano
  });
    let maxValor = 0;
    let mesMaxValor = '';
    Object.keys(groupedContracts).forEach(monthYear => {
      if (groupedContracts[monthYear].totalValue > maxValor) {
          maxValor = groupedContracts[monthYear].totalValue;
          mesMaxValor = groupedContracts[monthYear].month + '/' + groupedContracts[monthYear].year;
      }
    });
    const response:ResponseContractPaytmentsDTO = {
      mesAno: mesMaxValor,
      valorMaximo: maxValor
    };
    return response;

  }

  async findAll(page?: number, size?: number): Promise<IContractPaginationDTO> {
    try {
        const queryOptions: any = {
            order: {
                date: 'ASC'
            }
        };

        if (page !== undefined && size !== undefined && typeof page === 'number' && typeof size === 'number') {
            queryOptions.skip = (page - 1) * size;
            queryOptions.take = size;
        }

        console.log('queryOptions:', queryOptions); // Verifique os parâmetros de paginação

        const [contracts, totalCount] = await contractRepository.findAndCount(queryOptions);
        const totalPage = Math.ceil(totalCount / size); // Calcular o número total de páginas

        const contractsPaginationDto: IContractPaginationDTO = {
            contracts,
            totalPage
        };

        return contractsPaginationDto;
    } catch (error) {
        console.error('Error in findAll:', error);
        throw error; // Rejeitar o erro ou tratá-lo conforme necessário
    }
}


  async findById(id: string): Promise<Contract | undefined> {
    try {
      const contract = await contractRepository.findOne({
        where: { id },
        relations: ['payments']
      });
      return contract;
    } catch (error) {
      console.error('Error in findById:', error);
      throw error; // Rejeitar o erro ou tratá-lo conforme a estratégia de tratamento de erros da sua aplicação
    }
  }

  async findPaymentsByContractId(id: string): Promise<Payment[] | undefined> {
    try {
      const payments = await paymentRepository.find({
        where: { contract: {
          id
        }

       },
       order: {
        due_date: 'ASC'
      }
      });
      return payments;
    } catch (error) {
      console.error('Error in findPaymentsByContractId:', error);
      throw error; // Rejeitar o erro ou tratá-lo conforme a estratégia de tratamento de erros da sua aplicação
    }
  }





  private async groupContractsByMonth(contractIds?:string[]): Promise<{ month: number, year: number, totalValue: number }[]> {
    const whereCondition = contractIds ? { id: In(contractIds) } : {};

    const contracts = await contractRepository.find({
      where: whereCondition,
      order: {
        date: 'ASC'
      }
    });

    // Agrupar contratos por mês/ano e calcular o total de valores
    const groupedContracts: { month: number, year: number, totalValue: number }[] = [];
    contracts.forEach(contract => {
      const month = contract.date.getMonth() + 1;
      const year = contract.date.getFullYear();
      const totalValue = contract.total_value;

      // Verificar se já existe um grupo para este mês/ano
      const existingGroup = groupedContracts.find(group => group.month === month && group.year === year);
      if (existingGroup) {
        existingGroup.totalValue += totalValue;
      } else {
        groupedContracts.push({ month, year, totalValue });
      }
    });

    // Ordenar os contratos agrupados por mês/ano (opcional, pois já estão ordenados pelo banco de dados)
    groupedContracts.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      } else {
        return a.month - b.month;
      }
    });
    return groupedContracts;
  }

}
