# /extract

> Para acessar essa rota utilize a url: http://localhost:3333/extract

Está rota é responsável por retornar um extrato das transações relizadas por uma empresa.

> :Importante: Após um derterminado tempo de uso é indicado que faça login novamente, pois o token pode expirar.

### Requisição

  Esse recurso é uma rota privada, etão é obrigatório enviar no **cabeçalho(header)** da requisição um parametro nomeado como **authorization**.

 > Campos que devem ser passados no cabeçalho(header) da requisição:

  Nome do campo  | tipo   | Obrigatório
  -------  | ------ | -----------
  authorization     | string |  sim

  - **authorization** -> Deve conter um token de altenticação. O token deve seguio este formato: **Bearer token**. Substitua a palavra "token" pelo token que você recebeu ao fazer login.

  > Exemplo de uma estrutura json para o header da requisição:

  - Header

  ```json
    {
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5MTYyNzcsImV4cCI6MTYwMjkyMzQ3Nywic3ViIjoiM2M3ZDc3MTUtMzg2MS00N2RmLWE4MTktODU0NTA4YTk3NTczIn0.Hny0UclzxxklnHYMP8FrBX4i4T79U5a2lgBMJMKxzFw"
    }
  ```

 Para conseguir caradastrar um novo cartão é necessario fazer uma requisição do tipo **GET** na rota **/extract** e passando os endpoinst para fazer a filtragem.



#### endPoints

  Essa rota possoue três endoits para filtrar as transações, sao eles:

  - **/day**

    Retorna Todas as transações realizadas em uma determinado dia. Para isso é necessáio enviar no **corpo da requisição(body)** um json com os seguintes campos:

    > Campos que devem ser passados no corpo(body) da requisição:

    Nome do campo  | tipo   | Obrigatório
    ------- | ------ | -----------
    day     | number |  sim
    month   | number |  sim
    year    | number |  sim
    type    | string |  sim


    - ```year``` -> Este campo deve conter o ano.
    - ```month``` -> Este campo deve conter o ano.
    - ```day``` -> Este campo deve conter o dia do mês em que deseja listar as transações realizadads.
    - ```type``` -> Este campo deve conter o tipo das transações que desejá obter no extrato. As transações podem ser do tipo DEBITO ou CREDITO.


    > OBS: O Ano, mes e o dia é para forma uma data do tipo dd-mm-yyyy, então a aplicação retorna todas as transações realizadas nesta data específica.
    > O campo "type" deve receber credit para listar transações do tipo CREDITO e debit para transações do tipo DEBITO.

    > Exemplo da extrutura json para fazer um requisição para essa rota.

    - Body

    ```json
    {
	    "day": 17,
	    "month": 10,
	    "year": 2020,
	    "type": "CREDIT"
    }
    ```
    Nesta requisição estamos pedindo que liste todas as transações do tipo CREDITO realizadas no dia 17 de Outubro de 2020.

  - **/month**

    Retorna Todas as transações realizadas em um determinado mês. Para isso é necessáio enviar no **corpo da requisição(body)** um json com os seguintes campos:

    > Campos que devem ser passados no corpo(body) da requisição:

    Nome do campo  | tipo   | Obrigatório
    ------- | ------ | -----------
    month   | number |  sim
    type    | string |  sim


    - ```year``` -> Este campo deve conter o ano.
    - ```month``` -> Este campo deve conter o ano.
    - ```type``` -> Este campo deve conter o tipo das transações que desejá obter no extrato. As transações podem ser do tipo DEBITO ou CREDITO.


    > OBS: O Ano e o mes é para forma uma data do tipo mm-yyyy, então a aplicação retorna todas as transações realizadas neste mês específico.
    > O campo "type" deve receber credit para listar transações do tipo CREDITO e debit para transações do tipo DEBITO.

    > Exemplo da extrutura json para fazer um requisição para essa rota.

    - Body

    ```json
    {
	    "month": 10,
	    "year": 2020,
	    "type": "CREDIT"
    }
    ```
    Nesta requisição estamos pedindo que liste todas as transações do tipo CREDITO realizadas no mes de Outubro de 2020.

    - **/card**

    Retorna Todas as transações realizadas em um determinado mês. Para isso é necessáio enviar no **corpo da requisição(body)** um json com os seguintes campos:

    > Campos que devem ser passados no corpo(body) da requisição:

    Nome do campo  | tipo   | Obrigatório
    -------    | ------ | -----------
    cardNumber | string |  sim


    - ```cardNumber``` -> Este campo deve conter o numero do cartão que desej listar as transacções realizadas.

    > OBS: O numero do cartão deve ser enviado seguido este padrão 0000 0000 0000 0000. Caso o número não siga esse padrão, a aplicação ira retornar um erro.

    > Exemplo da extrutura json para fazer um requisição para essa rota.

    - Body

    ```json
      {
	      "cardNumber": "1234 5678 9123 4567"
      }
    ```

### Resposta

Esta rota retorna uma responsta do tipo [response](https://responsehttp), contendo um vetor com todas as transações realizadas de acordo com os filtros. Cada transação vem com os seguintes campos:


Nome do campo | tipo
  -------     | ------ |
  id          | string |
  description | string |
  trasactionType| string |
  value         | string |
  type          | sting  |
  endOfCard    | string |
  establishment | string |
  company_Id | string |
  created_at | string |
  updated_at | string |

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
    "id": "2589786b-1714-4446-8b5e-d7ff6b3d009e",
    "description": "jest test credit",
    "trasactionType": "CARD",
    "value": "100",
    "type": "DEBIT",
    "cardNumber": "1234 5678 9123 4567",
    "establishment": null,
    "company_Id": "3c7d7715-3861-47df-a819-854508a97573",
    "created_at": "2020-10-18T20:02:40.491Z",
    "updated_at": "2020-10-18T20:02:40.491Z",
  }
```
### Erros

Depedendo dos dados enviados na requisição, a aplicação pode retornar um erro. Os seguintes erros podem acontecer.

- ```Comapny not found``` -> Esse erro pode acontecer quando o o token repassado no cabeçalho da requisição pertencer a uma conta que já não existe na aplicação, Ex: Uma empresa resolver deletar sua conta, o token dela não deve mais servir para ser utilizado nas rotas.

- ```This format of nuumber the cart is invalid``` -> Esse erro pode acontecer quando o formato do numero de cartão passado no endpoint ```/cart``` não estiver de acordo com o formato esperado.

- ```This number of cart is invalid``` -> Esse erro pode acontecer quando o numero do cartão passado no endpoint ```/cart``` não for um numero válido.

- ```None card fund with this number``` -> Esse erro pode acontecer quando numero de cartão passado no endpoint ```/cart```  não pertencer a nenhum dos cartoes cadastrados da empresa.
