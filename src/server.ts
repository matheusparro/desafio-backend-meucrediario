import express from 'express';
import { routes } from './routes';
import { AppDataSource } from './data-source';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.use(cors());
        // Middleware para utilizar as rotas definidas no arquivo routes.js
        app.use(routes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
