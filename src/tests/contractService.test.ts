import { ContractService } from '../services/ContractService';
import { contractRepository } from '../repositories/Contract';
import { paymentRepository } from '../repositories/Payment';

jest.mock('../repositories/Contract');
jest.mock('../repositories/Payment');

describe('ContractService', () => {
  let service: ContractService;

  beforeEach(() => {
    service = new ContractService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute contract creation', async () => {
    const contratosDTO = {
      contratos: [
        {
          parcelas: [
            {
              valorvencimento: 1000,
              datavencimento: new Date(),
              dataultimopagamento: new Date(),
              totalpago: 0,
              capitalaberto: 1000
            }
          ],
          contrato: '123',
          data: new Date(),
          valortotal: 1000,
          valorentrada: 0,
          valorfinanciado: 1000
        }
      ]
    };

    // Mockando o retorno do findOne 
    jest.spyOn(contractRepository, 'findOne').mockResolvedValueOnce(undefined as any);

    // Mockando o retorno do save 
    (contractRepository.save as jest.Mock).mockResolvedValueOnce({} as any);

    // Mockando o retorno do save do paymentRepository 
    (paymentRepository.save as jest.Mock).mockResolvedValueOnce({} as any);

    await service.execute(contratosDTO);

    // Verificando se o contrato e os pagamentos foram salvos corretamente
    expect(contractRepository.findOne).toHaveBeenCalled();
    expect(contractRepository.save).toHaveBeenCalled();
    expect(paymentRepository.save).toHaveBeenCalled();
  });

  // Adicione mais testes para os outros métodos conforme necessário
});
