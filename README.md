## Descrição

Este projeto é uma API desenvolvida em Node.js com TypeScript e TypeORM para gerenciar contratos e pagamentos.

## Funcionalidades

- **Sincronização de Contratos**: Rota para sincronizar contratos. - > /contract/sync
- **Listagem de Contratos**: Rota para listar todos os contratos com paginacao. ->/contract
- **Histórico de Dívida Máxima**: Rota para obter o histórico da maior dívida. -> /contract/max-debt-histor
- **Pagamentos por Contrato**: Rota para obter os pagamentos de um contrato específico. - > /contract/:id/payments



## Tecnologias Utilizadas

- Node.js
- TypeScript
- TypeORM
- PostgreSQL

## Configuração e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto


2. Rode o docker-compose.yml

3. ## Exemplo de Dados de Contratos necessarios no envio da rota  /contract/sync

```json
{
  "contratos": [
    {
      "contrato": "0480211980004830000001669920211214",
      "data": "2020-01-01",
      "valortotal": 500,
      "valorentrada": 0,
      "valorfinanciado": 500,
      "parcelas": [
        {
          "valorvencimento": 500.00,
          "datavencimento": "2020-02-01",
          "dataultimopagamento": "2020-02-15",
          "totalpago": 500.00,
          "capitalaberto": 0
        }
      ]
    },
    {
      "contrato": "0480212080000000000001669920160423",
      "data": "2020-01-08",
      "valortotal": 200.00,
      "valorentrada": 0,
      "valorfinanciado": 200.00,
      "parcelas": [
        {
          "valorvencimento": 200,
          "datavencimento": "2020-02-08",
          "dataultimopagamento": "2020-04-15",
          "totalpago": 200,
          "capitalaberto": 0
        }
      ]
    },
    {
      "contrato": "0480212080000000000001669920160423",
      "data": "2020-01-30",
      "valortotal": 300.00,
      "valorentrada": 0,
      "valorfinanciado": 300.00,
      "parcelas": [
        {
          "valorvencimento": 300,
          "datavencimento": "2020-02-28",
          "dataultimopagamento": "2020-05-16",
          "totalpago": 300,
          "capitalaberto": 0
        }
      ]
    },
    {
      "contrato": "0480212080000000000001669920160423",
      "data": "2020-02-17",
      "valortotal": 100.00,
      "valorentrada": 0,
      "valorfinanciado": 100.00,
      "parcelas": [
        {
          "valorvencimento": 100,
          "datavencimento": "2020-03-17",
          "totalpago": 0,
          "capitalaberto": 100
        }
      ]
    },
    {
      "contrato": "0480212080000000000001669920160423",
      "data": "2020-04-10",
      "valortotal": 600.00,
      "valorentrada": 0,
      "valorfinanciado": 600.00,
      "parcelas": [
        {
          "valorvencimento": 300,
          "datavencimento": "2020-05-10",
          "totalpago": 0,
          "capitalaberto": 300
        },
        {
          "valorvencimento": 300,
          "datavencimento": "2020-06-10",
          "totalpago": 0,
          "capitalaberto": 300
        }
      ]
    },
    {
      "contrato": "0480212080000000000001669920160423",
      "data": "2020-05-10",
      "valortotal": 1000.00,
      "valorentrada": 0,
      "valorfinanciado": 1000.00,
      "parcelas": [
        {
          "valorvencimento": 500,
          "datavencimento": "2020-06-10",
          "totalpago": 0,
          "capitalaberto": 500
        },
        {
          "valorvencimento": 300,
          "datavencimento": "2020-07-10",
          "totalpago": 0,
          "capitalaberto": 500
        }
      ]
    }
  ]
}
