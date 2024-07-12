import { Router } from 'express';
import { ContractController } from './controllers/ContractController';

const routes = Router();

routes.post('/contract/sync', new ContractController().execute);

routes.get('/contract', new ContractController().findAll);

routes.get('/contract/max-debt-history', new ContractController().maxDebt);

routes.get('/contract/:id/payments', new ContractController().findPaymentsByContractId);

routes.get('/', (req, res) => {
    res.send('Hello World!');
})
export { routes };