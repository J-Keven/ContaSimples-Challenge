# /transactions

> Para acessar essa rota utilize a url: http://localhost:3333//transactions

Está rota é responsável por acessar o recurso de transaçãoes.

> 🔥  Após um derterminado tempo de uso é indicado que faça login novamente, pois o token pode expirar.

### Requisição

  Esse recurso é uma rota privada, então é obrigatório enviar no **cabeçalho(header)** da requisição um parametro nomeado como **authorization** contendo o teken de autenticação.

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

  Vocẽ pode criar uma nova transação fazendo uma requisição para esta rota com o método **POST** passando os seguintes parâmetros:

  Nome do campo  | tipo   | Obrigatório
  ------- | ------ | -----------
  description    | string |  sim
  trasactionType | string |  sim
  cardNumber     | string |  não
  establishment  | string |  não
  value          | string |  sim
  type           | string |  sim

  - ```description``` -> Este campo deve conter uma descrição para a transação.
  - ```trasactionType``` -> Este campo deve conter o tipo de transação que sera realizado. Ex: TED, PIX, DOC e etc... Também aceita o tipo ```CARD```, que indica que essa transação sera feita utilizando um dos cartões cadastrados na conta da empresa.
  - ```value``` -> Este campo deve conter o valor da transação.
  - ```type``` ->  Este campo deve conter o tipo da transação, se é uma transação de DEBITO ou CREDITO. Para transações de debito utilize ```debt``` e para transações de credito utilize ```credit```.
  - ```cardNumber``` -> Este é um parâmetro opcional, mas passa a ser obigatório para transações com cartões, ou seja ```trasactionType``` igual a ```CARD```. Ele deve conter o numero do cartão que foi utilizado para fazer a transação.
  - ```establishment``` -> Esse é um parametro opcional, ele deve conter o nome do estabelecimeto que para o qual foi feita a transação.

  > Exemplo de uma estrutra json para fazer uma requisição nessa rota:

```json
  {
    "description": "jest test credi",
    "trasactionType": "CARD",
    "cardNumber": "1234 5673 9123 1111",
    "value": 100,
    "type": "DEBIT"
  }
```

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

 - ```id``` -> Contém um valor do tipo uuid que representa o id da tubla em que os dados estão salvos no banco.

  - ```company_Id``` -> Contém o um valor do tipo uuid que representa o id da empresa que realizou a transação.

  - ```description``` -> Contém a descrição da transação.

  - ```trasactionType``` -> Contém o tipo que foi utilizado para realizar a transação. EX: TED, PIX, DOC e etc.

  - ```type``` -> Contém o método(tipo) da transação, se foi uma transação do tipo cretido ou debito.

  - ```value``` -> Contém o valor da transação.

  - ```endOfCard``` -> Contém os 4 digitos finais do numero do cartão caso a transação tenha sido com o cartão, caso não teha sido com o cartão, o valor serar ```null```.

  - ```establishment``` -> O nome do estabelecimento que para o qual foi feita a transação, Como esse é um parametro opcional, é posiveil que seu valor sejo ```null```.

  - ```created_at``` -> Contém uma data data em que a conta foi criada. Essa data esta no formato timestamp.

  - ```updated_at``` -> Contém uma data da ultima alteração feita nos dados cadastrados da empresa. Essa data esta no formato timestamp.


> emxemplo de  estrutura json obtido com a rerposta que a aplicação retorna ao acessar essa rota.

```json
  {
    "description": "jest test credit",
    "trasactionType": "CARD",
    "value": 100,
    "type": "DEBIT",
    "company_Id": "3c7d7715-3861-47df-a819-854508a97573",
    "id": "10c21f3b-3767-41b1-9b85-809d598aa2d1",
    "created_at": "2020-10-20T03:04:32.555Z",
    "updated_at": "2020-10-20T03:04:32.555Z",
    "endOfCard": "1111"
  }
```

### Erros

Depedendo dos dados enviados na requisição, a aplicação pode retornar um erro. Os seguintes erros podem acontecer.

- ```Comapny not found``` -> Esse erro e retornado quando o token repassado no cabeçalho da requisição pertencer a uma conta que já não existe na aplicação, Ex: Uma empresa resolver deletar sua conta, o token dela não deve mais servir para ser utilizado nas rotas.

- ```insufficient balance``` -> Esse erro pode acontecer quando uma requisição para transação do tipo DEBITO é feita, mas o saldo da empresa é isuficiente. Esse erro vem aconpahado de um satus code de 400.

- ```This fromat number of card is invalid``` -> Esse erro e retornado quando uma requisição para transação que utiliza cartã é feita, mas mas o formato do numero do cartão não segue o padrão mesionado anteriormente. Esse erro vem aconpahado de um satus code de 400.

- ```Number of card is required``` -> Esse erro e retornado quando uma requisição para transação que utiliza cartão é feita, mas o numero do cartão não é enviado. Esse erro vem aconpahado de um satus code de 400.

- ```This number of card is invalid``` -> Esse erro e retornado quando uma requisição para transação que utiliza cartã é feita, mas o numero do cartão não é valido. Esse erro vem aconpahado de um satus code de 400.

- ```Card non exist``` -> Esse erro e retornado quando uma requisição para transação que utiliza cartão é feita, mas o numero do cartão não pertence a nenhum dos cartões cadastrados da empresa. Esse erro vem aconpahado de um satus code de 400.



