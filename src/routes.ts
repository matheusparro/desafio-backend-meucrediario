import { Router } from "express";
import { ContractController } from "./controllers/ContractController";

const routes = Router();

routes.post("/contract/sync", new ContractController().execute);

export { routes };