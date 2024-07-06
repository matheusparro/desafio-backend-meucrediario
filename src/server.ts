// index.js
import express from 'express';
import { routes } from './routes';
import bodyParser from 'body-parser';

const app = express();

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Middleware para interpretar o corpo das requisições como JSON
app.use(bodyParser.json({ limit: '200mb' })); // Ajuste o limite conforme necessário

// Middleware para interpretar os corpos das requisições codificados em URL
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para utilizar as rotas definidas no arquivo routes.js
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
