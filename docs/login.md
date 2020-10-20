# /login

> Para acessar essa rota utilize a url: http://localhost:3333/login

Está rota é responsável por fazer o login da aplicação e gerar um token JWT de autenticação que será usado para acessar as rotas privadas da aplicação.

### Requisição

  Para ter acesso a esse recurso da aplicação é necessario fazer uma requisição do tipo **POST** no endereço **http://localhost:3333/login** passando os seguintes campos no **corpo da requisição(body)**

> Campos que deve ser passados no corpo da requisição:

  Nome do campo  | tipo   | Obrigatório
  -------  | ------ | -----------
  cnpj     | string |  sim
  password | string |  sim

   - ```cnpj``` -> Este campo recebe o cnpj informado na hora de criar a conta para a empresa.

  - ```password``` -> Este campo recebe a senha utiliza na criação da conta.

  > Exemplo da extrutura json para fazer um requisição para essa rota.

  ```json
  {
	"cnpj": "13182905000174",
	"password": "123456"
  }
  ```
### Resposta

A resposta retornada por essa rota é do tipo [response](https://expressjs.com/pt-br/api.html#res) e pode conter no corpo da resposta um json contentento os dados da aplicação juntamente com o token de altenticação que será utilado para acessar as rotas privadas ou um erro que pode ser gerado caso os dados de para login estejam incorretos.

> A resposta contem os seguintes campos

Nome do campo  | tipo
  -------     | ------ |
  name        | string |
  cnpj        | string |
  email       | string |
  id          | string |
  created_at  | sting  |
  updated_at  | string |
  token | string |

   - ```name``` -> O campo name contém o nome da empresa.

   - ```cnpj``` -> Contém o cnpj da empresa. O cnpj será utilizado para fazer login na aplicação, juntamente com a senha passado no campo **password** ao fazer a requisição.

  - ```email``` -> Contém o email que será usado para futuro envio de emails.
  - ```id``` -> Contém um valor do tipo uuid que representa o id da tubla em que os dados estão salvos no banco.

  - ```created_at``` -> Contem uma data data em que a conta foi criada. Essa data esta no formato timestamp.

  - ```updated_at``` -> Contem uma data da ultima alteração feita nos dados cadastrados da empresa. Essa data esta no formato timestamp.

  - ```token``` -> Esste campo contem o um token jtw que deve ser usado para acessar as rotas privadas da aplicação. Esse token expira 2 horas após o login.

> Exemplo de  estrutura json obtida ao fazer login:

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
}
```
### erros

Depedendo dos dados enviados na requisição, a aplicação pode retornar um erro. Os seguintes erros podem acontecer.

- ```Cnpj/password incorrect``` -> Esse erro vem com o código http 401 e é gerado caso o cnpj ou pessword enviado no corpo da requisição não estejam corretos.

