# /companies/balance

> Para acessar essa rota utilize a url: http://localhost:3333//companies/balance

Está rota é responsável por retornar um balancete da uma empresa.

> :Importante: Após um derterminado tempo de uso é indicado que faça login novamente, pois o token pode expirar.

### Requisição

  Esse recurso é uma rota privada, etão é obrigatório enviar no **cabeçalho(header)** da requisição um parametro nomeado como **authorization**.

 > Campos que devem ser passados no cabeçalho(header) da requisição:

  Nome do campo  | tipo   | Obrigatório
  -------  | ------ | -----------
  authorization     | string |  sim

  - ```authorization``` -> Deve conter um token de altenticação. O token deve seguir este formato: **Bearer token**. Substitua a palavra "token" pelo token que você recebeu ao fazer login.

  > Exemplo de uma estrutura json para o header da requisição:

  - Header

  ```json
    {
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5MTYyNzcsImV4cCI6MTYwMjkyMzQ3Nywic3ViIjoiM2M3ZDc3MTUtMzg2MS00N2RmLWE4MTktODU0NTA4YTk3NTczIn0.Hny0UclzxxklnHYMP8FrBX4i4T79U5a2lgBMJMKxzFw"
    }
  ```

  Para obter o balancete de uma empresa é necessario fazer uma requisição do tipo **GET** na rota **companies/balancet**.

### Resposta

Esta rota retorna uma responsta do tipo [response](https://expressjs.com/pt-br/api.html#res), contendo um json com os seguintes campos:

Nome do campo   | tipo
  -------       | ------ |
  balanceTotal  | number |
  creditTotal   | number |
  debitTotal    | number |


  - ```balanceTotal``` -> Contém o saldo total disponível na conta.

  - ```creditTotal``` -> Contém o valor total de todas as transações realizandas no CREDITO.

  - ```debitTotal``` -> Contém o valor total de todas as transações realizandas no DEBITO.

> emxemplo de  estrutura json obtido com a rerposta que a aplicação retorna ao acessar essa rota.

```json
  {
    "balanceTotal": 0,
    "creditTotal": 400,
    "debitTotal": 400
  }
```

### Erros

Depedendo dos dados enviados na requisição, a aplicação pode retornar um erro. Os seguintes erros podem acontecer.

- ```Comapny not found``` -> Esse erro pode acontecer quando o o token repassado no cabeçalho da requisição pertencer a uma conta que já não existe na aplicação, Ex: Uma empresa resolver deletar sua conta, o token dela não deve mais servir para ser utilizado nas rotas.

