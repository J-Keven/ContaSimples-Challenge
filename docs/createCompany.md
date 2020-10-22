# /companies

> Para acessar essa rota utilize a url: baseURL/companies

Está rota é responsável por criar uma conta para uma empresa na aplicação.
A partir deste conta é que a empresa porderar fazer login, realizar transações, adicionar cartões e ver seu saldo.

### Requisição
  Para ter acesso a esse recurso da aplicação é necessario fazer uma requisição do tipo **POST** na rota **/companies** passando os seguintes campos no **corpo da requisição(body)**

> Campos que deve ser passados no corpo da requisição:

  Nome do campo  | tipo   | Obrigatório
  -------  | ------ | -----------
  name     | string |  sim
  cnpj     | string |  sim
  email    | string |  sim
  password | string |  sim

   - ```name``` -> O campo name recebe o nome da empresa.

   - ```cnpj``` -> Este campo recebe o cnpj da empresa.

  - ```email``` -> Este capo recebe o email que será usado para envio de email.

  - ```password``` -> Este campo recebe a senha para fazer login na aplicação.

  > Exemplo da extrutura json para fazer um requisição para essa rota.

  ```json
    {
      "name": "Empresa s/a",
      "cnpj": "13182905000174",
      "email": "empresasa23@example.com",
      "password": "123456"
    }
  ```
### Resposta

Esta rota retorna uma responsta do tipo [response](https://expressjs.com/pt-br/api.html#res) ou um erro.

Se todos os dados enviadso for válidos, a rota retorna uma resposta contendo os dados da conta da empresa na aplicação e os dados da conta bancária.

> A resposta contem os seguintes campos

Nome do campo  | tipo
  -------     | ------ |
  name        | string |
  cnpj        | string |
  email       | string |
  id          | string |
  created_at  | sting  |
  updated_at  | string |
  BankNumber  | number |
  bankName    | string |
  agencyNumber  | number |
  accountNumber | string |
  accountDigit  | string |

   - ```name``` -> O campo name rcontém nome da empresa.

   - ```cnpj``` -> Contém o cnpj da empresa. O cnpj será utilizado para fazer login na aplicação, juntamente com a senha passado no campo **password** ao fazer a requisição.

  - ```email``` -> Contém o email que será usado para futuro envio de emails.
  - ```id``` -> Contém um valor do tipo uuid que representa o id da tupla em que os dados estão salvos no banco.

  - ```created_at``` -> Contem a data data em que a conta foi criada. Essa data está no formato timestamp.

  - ```updated_at``` -> Contem a data da ultima alteração feita nos dados cadastrados da empresa. Essa data esta no formato timestamp.

- ```BankNumber``` -> Contém o numero do Banco no qual a conta bancária pertence.

- ```accountNumber``` -> Contem o número da conta bancária da empresa.

- ```accountDigit``` -> Contem o digito da conta bancária da empresa.

> emxemplo de  estrutura json obtido com a rerposta que a aplicação retorna ao acessar essa rota.

```json
  {
    "company": {
      "name": "Empresa s/a",
      "cnpj": "13182905000174",
      "email": "empresasa23@example.com",
      "id": "6e1bb0e0-3992-415a-85aa-4b635b407bc1",
      "created_at": "2020-10-19T15:20:35.437Z",
      "updated_at": "2020-10-19T15:20:35.437Z"
    },
    "bankAccount": {
      "company_Id": "6e1bb0e0-3992-415a-85aa-4b635b407bc1",
      "BankNumber": 999,
      "bankName": "CONTA SIMPLES",
      "agencyNumber": 1,
      "accountNumber": "6541647",
      "accountDigit": "51",
      "id": "644d8a34-b3aa-4131-948a-c39ed6e3dc1d",
      "created_at": "2020-10-19T15:20:35.469Z",
      "updated_at": "2020-10-19T15:20:35.469Z"
    }
  }
```
### erros

Depedendo dos dados enviados na requisição, a aplicação pode retornar um erro. Os seguintes erros podem acontecer.

- ```there is already a company registered with this cnpj``` -> Esse erro vem com o código http 400. Esse erro é gerado caso o cnpj enviado na requisição já tenha sido cadastrado antes.

- ```there is already a company registered with this email``` -> Esse erro vem com o código http 400. Esse erro é gerado caso o email utilizado para criar a conta já esteja sendo usado por outra empresa.
