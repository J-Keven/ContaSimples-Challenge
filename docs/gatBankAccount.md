# /companies/bankAccount/me

 Para acessar essa rota utilize a url: http://localhost:3333/companies/bankAccount/me

Está rota é responsável por retornar os dados bancário da empresa.

> :Importante: Após um derterminado tempo de uso é indicado que faça login novamente, pois o token pode expirar.

### Requisição

  Esse recurso é uma rota privada, etão é obrigatório enviar no **cabeçalho(header)** da requisição um parametro nomeado como **authorization**.

 > Campos que devem ser passados no cabeçalho(header) da requisição:

  Nome do campo  | tipo   | Obrigatório
  -------  | ------ | -----------
  authorization     | string |  sim

  - **authorization** -> Deve conter um token de altenticação. O token deve seguir este formato: **Bearer token**. Substitua a palavra "token" pelo token que você recebeu ao fazer login.

  > Exemplo de uma estrutura json para o header da requisição:

  - Header

  ```json
    {
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5MTYyNzcsImV4cCI6MTYwMjkyMzQ3Nywic3ViIjoiM2M3ZDc3MTUtMzg2MS00N2RmLWE4MTktODU0NTA4YTk3NTczIn0.Hny0UclzxxklnHYMP8FrBX4i4T79U5a2lgBMJMKxzFw"
    }
  ```

  Para obter os dados bancários de uma empresa é necessario fazer uma requisição do tipo **GET** na rota **companies/balancet**.

### Resposta

Esta rota retorna uma responsta do tipo [response](https://expressjs.com/pt-br/api.html#res), contendo um json com os seguintes campos:

Nome do campo   | tipo
  -------       | ------ |
  id            | string |
  created_at    | sting  |
  updated_at    | string |
  BankNumber    | number |
  bankName      | string |
  agencyNumber  | number |
  accountNumber | string |
  accountDigit  | string |


  - ```id``` -> Contém o um um valor do tipo uuid que representa o id da tubla em que os dados estão salvos no banco.

  - ```created_at``` -> Contem uma data data em que a conta foi criada. Essa data esta no formato timestamp.

  - ```updated_at``` -> Contem uma data da ultima alteração feita nos dados cadastrados da empresa. Essa data esta no formato timestamp.

  - ```BankNumber``` -> Contém o numero do Banco no qual a conta bancária pertence.

  - ```accountNumber``` -> Contem o número da conta bancária da empresa.

  - ```accountDigit``` -> Contem o digito bancária da empresa.

Essa rota também retorna na sua resposta todos os dados da empres, para ver mais sobre esses dados [click aqui]()

> emxemplo de  estrutura json obtido com a rerposta que a aplicação retorna ao acessar essa rota.

```json
  {
    "id": "d0a7599b-fa75-4d4b-a6d5-981b1fdb0b6a",
    "company_Id": "3c7d7715-3861-47df-a819-854508a97573",
    "BankNumber": 999,
    "bankName": "CONTA SIMPLES",
    "agencyNumber": 1,
    "accountNumber": "2121081",
    "accountDigit": "96",
    "created_at": "2020-10-17T09:31:00.245Z",
    "updated_at": "2020-10-17T09:31:00.245Z",
    "company": {
      "id": "3c7d7715-3861-47df-a819-854508a97573",
      "name": "Empresa s/a",
      "cnpj": "13182905000173",
      "email": "empresasa3@example.com",
      "created_at": "2020-10-17T09:31:00.168Z",
      "updated_at": "2020-10-17T09:31:00.168Z"
    }
  }
```

### Erros

Depedendo dos dados enviados na requisição, a aplicação pode retornar um erro. Os seguintes erros podem acontecer.

- ```Comapny not found``` -> Esse erro pode acontecer quando o o token repassado no cabeçalho da requisição pertencer a uma conta que já não existe na aplicação, Ex: Uma empresa resolver deletar sua conta, o token dela não deve mais servir para ser utilizado nas rotas.

