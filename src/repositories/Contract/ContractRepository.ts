import { Repository } from "typeorm";
import { Contract } from "../../entities/Contract/Contract";


export class ContractRepository extends Repository<Contract> {

    // Método para criar um novo contrato
    async createContract(contractData: Partial<Contract>): Promise<Contract> {
        const newContract = this.create(contractData);
        return await this.save(newContract);
    }

    // Outros métodos CRUD e personalizados podem ser definidos aqui conforme necessário

}
