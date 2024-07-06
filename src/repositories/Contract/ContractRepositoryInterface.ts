export interface ContractRepositoryInterface {
    createContract(contractData: Partial<Contract>): Promise<Contract>;
    findContractById(id: string): Promise<Contract | undefined>;
    findContractByDocumentNumber(documentNumber: string): Promise<Contract | undefined>;
    updateContract(id: string, contractData: Partial<Contract>): Promise<Contract>;
    deleteContract(id: string): Promise<boolean>;
}