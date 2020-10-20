# /transactions/me/last

> Para acessar essa rota utilize a url: http://localhost:3333/transactions

Está rota é responsável por acessar o recurso de transaçãoes.

> :Importante: Após um derterminado tempo de uso é indicado que faça login novamente, pois o token pode expirar.

### Requisição

  Esse recurso é uma rota privada, etão é obrigatório enviar no **cabeçalho(header)** da requisição um parametro nomeado como **authorization**.

 > Campos que devem ser passados no cabeçalho(header) da requisição:

  Nome do campo  | tipo   | Obrigatório
  ------- | ------ | -----------
  authorization | string |  sim

  - ```authorization``` -> Deve conter um token de altenticação. O token deve seguir este formato: **Bearer token**. Substitua a palavra "token" pelo token que você recebeu ao fazer login.

  > Exemplo de uma estrutura json para o header da requisição:

  - Header

  ```json
    {
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5MTYyNzcsImV4cCI6MTYwMjkyMzQ3Nywic3ViIjoiM2M3ZDc3MTUtMzg2MS00N2RmLWE4MTktODU0NTA4YTk3NTczIn0.Hny0UclzxxklnHYMP8FrBX4i4T79U5a2lgBMJMKxzFw"
    }
  ```

  A rota **/transactions** possui o endPoit **/me/last** que retorna a ultima transação realizada pela empresa logada. Para isso faça uma requisição do tipo **GET** na url dessa rota adicionado o end pont /me/last, que ficará assim: http://localhost:3333/transactions/me/last .

### Resposta

Esta rota retorna uma responsta do tipo [response](https://expressjs.com/pt-br/api.html#res), contendo um json com os dados da transação, contendo os seguintes campos:

  Nome do campo  | tipo
  -------------- | ----
  id             | string
  company_Id     | string
  description    | string
  trasactionType | string
  endOfCard      | string
  establishment  | string
  value          | string
  type           | string
  created_at     | string
  updated_at     | string

 - ```id``` -> Contém o um um valor do tipo uuid que representa o id da tubla em que os dados estão salvos no banco.

  - ```company_Id``` -> Contém o um valor do tipo uuid que representa o id da empresa que realizou a transação.

  - ```description``` -> Contem a descrição da transação.

  - ```trasactionType``` -> Contem o tipo que foi utilizado para realizar a transação. EX: TED, PIX.

  - ```type``` -> Contem o metodo(tipo) da transação, se foi uma transação do tipo cretido ou debito.

  - ```value``` -> Contem o valor da transação.

  - ```endOfCard``` -> Contem os 4 digitos finais do numero do cartão caso a transação tenha sido com o cartão, caso n teha sido com o cartão, o valor serar ```null```.

  - ```establishment``` -> O nome do estabelecimento que para o qual foi feita a transação, Como esse é um parametro opcional, é posivil que seu valor sejo ```null```.

  - ```created_at``` -> Contem uma data data em que a conta foi criada. Essa data esta no formato timestamp.

  - ```updated_at``` -> Contem uma data da ultima alteração feita nos dados cadastrados da empresa. Essa data esta no formato timestamp.


> emxemplo de  estrutura json obtido com a rerposta que a aplicação retorna ao acessar essa rota.

```json
  {
    "id": "7757aeaf-92c3-452f-a319-76a765cba617",
    "description": "jest test credit",
    "trasactionType": "CARD",
    "value": "100",
    "type": "DEBIT",
    "cardNumber": "0000 1111 2222 3333 4444",
    "establishment": null,
    "company_Id": "3c7d7715-3861-47df-a819-854508a97573",
    "created_at": "2020-10-17T09:32:53.887Z",
    "updated_at": "2020-10-17T09:32:53.887Z"
  }
```

### Erros

Depedendo dos dados enviados na requisição, a aplicação pode retornar um erro. Os seguintes erros podem acontecer.

- ```Comapny not found``` -> Esse erro e retornado quando o o token repassado no cabeçalho da requisição pertencer a uma conta que já não existe na aplicação, Ex: Uma empresa resolver deletar sua conta, o token dela não deve mais servir para ser utilizado nas rotas.




