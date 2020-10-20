# /cards

> Para acessar essa rota utilize a url: http://localhost:3333/cards

Está rota é responsável por adicionar un novo cartão para a empresa. Para que sejá possovél adicionar um cartão é necessário ter uma conta criada e ter feito login para ontber o token de autenticação.

> :Importante: Após um derterminado tempo de uso é indicado que faça login novamente, pois o token pode expirar.

### Requisição

  Esse recurso é uma rota privada, etão é obrigatório enviar no **cabeçalho(header)** da requisição um parametro nomeado como **authorization**.

 > Campos que devem ser passados no cabeçalho(header) da requisição:

  Nome do campo  | tipo   | Obrigatório
  -------  | ------ | -----------
  authorization     | string |  sim

  - ```authorization``` -> Deve conter um token de altenticação. O token deve seguio este formato: **Bearer token**. Substitua a palavra "token" pelo token que você recebeu ao fazer login.

  Para conseguir caradastrar um novo cartão é necessario fazer uma requisição do tipo **POST** na rota **/companies** passando os seguintes campos no **corpo da requisição(body)**

> Campos que devem ser passados no corpo(body) da requisição:

  Nome do campo  | tipo   | Obrigatório
  -------  | ------ | -----------
  cardName     | string |  sim
  cardNumber     | string |  sim
  ccv    | number |  sim
  password | string |  sim

  - ```cardName``` -> Este campo deve conter o nome um aplido para o cartão.

  - ```cardNumber``` -> Este comapo deve conter o numero do cartão no seguinte formato: "000 0000 0000 0000". Se for enviado um formato defernte a aplicação retorna um erro com a messagem **The card number format is invalid** e um status code de 400.

  - ```ccv``` -> Deve conter o numero do ccv do cartão.

  > Exemplo da extrutura json para fazer um requisição para essa rota.

  - Header

  ```json
    {
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5MTYyNzcsImV4cCI6MTYwMjkyMzQ3Nywic3ViIjoiM2M3ZDc3MTUtMzg2MS00N2RmLWE4MTktODU0NTA4YTk3NTczIn0.Hny0UclzxxklnHYMP8FrBX4i4T79U5a2lgBMJMKxzFw"
    }
  ```

  - Body

  ```json
    {
	"name": "Empresa s/a",
	"cnpj": "13182905000174",
	"email": "empresasa23@example.com",
	"password": "123456"
  }
  ```

### Resposta

Esta rota retorna uma responsta do tipo [response](https://expressjs.com/pt-br/api.html#res), contendo os dados do cartão cadastrado

> A resposta contem os seguintes campos

Nome do campo  | tipo
  -------     | ------ |
  cardName        | string |
  cardNumber        | string |
  ccv       | string |
  id          | string |
  created_at  | sting  |
  updated_at  | string |

   - ```cardName``` -> Este campo deve conter o nome um aplido para o cartão.

   - ```cardNumber``` -> Este comapo deve conter o numero do cartão no seguinte formato: "000 0000 0000 0000". Se for enviado um formato defernte a aplicação retorna um erro com a messagem **The card number format is invalid** e um status code de 400.

  - ```ccv``` -> Deve conter o numero do ccv do cartão.

  - ```id``` -> Contém o um um valor do tipo uuid que representa o id da tubla em que os dados estão salvos no banco.

  - ```created_at``` -> Contem uma data data em que a conta foi criada. Essa data esta no formato timestamp.

  - ```updated_at``` -> Contem uma data da ultima alteração feita nos dados cadastrados da empresa. Essa data esta no formato timestamp.

> emxemplo de  estrutura json obtido com a rerposta que a aplicação retorna ao acessar essa rota.

```json
  {
  "company_Id": "3c7d7715-3861-47df-a819-854508a97573",
  "cardNumber": "1234 5673 9123 1111",
  "cardName": "Cartao Conta Simples",
  "ccv": "667",
  "id": "f3211c6a-086f-4bc2-9146-b3379ffbd0fa",
  "created_at": "2020-10-19T21:24:07.096Z",
  "updated_at": "2020-10-19T21:24:07.096Z"
}
```
### erros

Depedendo dos dados enviados na requisição, a aplicação pode retornar um erro. Os seguintes erros podem acontecer.

- **The card number format is invalid** -> Esse erro pode acontecer quando o numero do cartão não obeder o padrao mansionado anteriormente e vem acompanhado de um status code de 400.

- **Comapny not found** -> Esse erro pode acontecer quando o o token repassado no cabeçalho da requisição pertencer a uma conta que já não existe na aplicação, Ex: Uma empresa resolver deletar sua conta, o token dela não deve mais servir para ser utilizado nas rotas.

- **There is already a card registered with that number** -> Se obter esse erro, significa que a ampresa ja tem um cartão cadastrado com o numero informado.
