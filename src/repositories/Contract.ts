import { AppDataSource } from '../data-source';
import { Contract } from '../entities/Contract';

export const contractRepository = AppDataSource.getRepository(Contract);