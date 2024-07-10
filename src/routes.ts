import { Router } from "express";
import { ContractController } from "./controllers/ContractController";

const routes = Router();

routes.post("/contract/sync", new ContractController().execute);

routes.get("/contract", new ContractController().findAll);

routes.post("/contract/max-debt-history", new ContractController().maxDebt);


export { routes };