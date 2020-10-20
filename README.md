<div align='center'>
  <h1>Desafio Conta Simples</h1>
</div>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/J-Keven/ContaSimples-Challenge?color=blue">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">

  <a href="https://github.com/J-keven/ContaSimples-Challenge/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/J-Keven/ContaSimples-Challenge?style=social">
  </a>

  <a href="https://github.com/J-Keven/ContaSimples-Challenge/network/members">
    <img alt="Stargazers" src="https://img.shields.io/github/forks/J-keven/ContaSimples-Challenge?style=social">
  </a>
</p>


<p align="center">
  <a href="#rocket-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-requisios">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-como-utilizar">Como Utilizar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-contribuir">Como Contribuir</a>&nbsp;&nbsp;&nbsp;
  <!-- <a href="#memo-licença">Licença</a> -->
</p>

## Sobre
A aplicação desenvolvida é uma API REST de uma aplicação bancário, onde uma empresa pode criar sua conta e realizar transações do tipo credito e do tipo debito e utilizar cartões cadastrados pela propria empresa em suas transações. Essa aplicação é uma solução desenvolvida para o desafio  de Back-end da Conta Simples.

> 💡 para acessar o desafio, [click aqui](https://gitlab.com/desafio-conta-simples/developer)!

### 🔥Requisios
A aplicação desenvolvida atende os seguintes requisitos:

- A empresa deve ser capaz de criar uma conta na aplicação;
- A empresa deve ser capaz de fazer login na aplicação;
- A empresa deve ser capaz de consultar seu saldo;
- A empresa deve ser capaz de obter um extrato de saus transações -> filtradas por
Data de Transação e flag de "Crédito" e "Débito";
- A empresa deve ser capaz de obter a sua última transação realizada;
- A empresa deve ser capaz de onbter todas as sua transações realizadas com um determinado cartão;
- A empresa deve ser capaz de obter uma lista com todos os seus cartões cadastrados.
- A empresa deve ser capaz de obter os seu dados bancário(Numero da conta, Nome do banco, etc...);

## 🔥Como utilizar

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/) v12x** instalado na máquina
  - Também, é **preciso** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - É importante que tenha um banco **postgreSQL** criado e rodando na sua máquina.
  - E essencial que o banco de dados esteja limpo e não esteja sendo utilizado por outra aplicação, assim garante o bom funcionamento desta apliação e que esta aplicação não gere inconsistência para outras aplicações q possam estar usando o mesmo banco.


1. Faça um clone desse projeto:

```sh
  $ git clone https://github.com/J-Keven/ContaSimples-Challenge.git
```

2. Entre na pasta da aplicação:
  ```sh
    $ cd ContaSimples-Challenge
  ```
3. Alterando as informações de conexão com o Banco:
  > 🔥 É essencial que essas alterações sejam feitas para que a aplicação possa se conectar banco de dados.

  - Abra o arquivo ``ormconfig.json`` e coloque as credenciais do seu banco.
   Ex:
  ```javascript
  {
    "type": "postgres",//tipo de banco. Ex: postgres, mysql
    "host": "localhost",//onde está sedo executando o banco
    "port": 5432, // A porta que o banco está usando
    "username": "postgres",
    "password": "docker",
    "database": "challenge",//nome do banco
  }
  ```
4. Instale as depedências:
```sh
  # Instale as dependências
  $ yarn

  # ou

  $ npm i
```

5. Executando a Aplicação:
```sh
  $ yarn start

  # ou

  $ npm run start
```

Esse comanto ira criar as tabelas necessárioas no seu banco de dados e logo após ira inicar o servidor da aplicação. Assim que as seguntes mensagem aparecerem no seu terminal, a aplicação ja está pronta para ser usada.

```
  $ 🚀 The server is running in address http://localhost:3333
  $ connected in database
```

6. Executando testes:

  A Aplicação foi desenvolvida utlizando DDD e para cada domínio foi desenvolvido um suite de testes unitário. Caso queira executar os testes execute:

```sh
  $ yarn test

```
  Esse comando vai execultar todos os testes e no fim exibe o covarage com os resultados dos testes.

### Utilizando a aplicação

Após fazes as alterações necessárias para rodar a aplicação e executar a plicação você acessar os recursos da aplicação.

A aplicação vai estar executando em um ambiente local, ou seja, na sua maquina. Então o a url começa com **http://localhost**.
Se preferir você pode trocar o  'localhost' pelo IP local da sua máquina.

A aplicação está utilizano a porta **3333** da sua máquina.

Tendo em vista os casos acima o endereço da apliação é **http://localhost:3333**.

- ### Rotas
> A aplicação foi desenvolvida utilizando o padrão rest api e, de acordo com o padrão, a  aplicação utiliza a estrutura de dados **json** para receber os dados de uma requisição e enviar dados em uma resposta.

A aplicação contém os seguintes recursos e você pode acessar cada recurso da aplicação fazendo requições http de acordo com o padrão rest.

> OBS: As Urls abaixos só poderão ser acessadas quando a aplicação estiver executando na sua maquina.

Rota | url | Método HTPP
---- | --- | ------
Criar uma conta | http://localhost:3333/companies | POST
Fazer login | http://localhost:3333/login | POST
Cadastrar um novo cartão | http://localhost:3333/cards | POST
Cadastrar uma nova transação | http://localhost:3333/transactions | POST
Lista a ultima transação realizada | http://localhost:3333/companies/me/last | GET
Extrato das transações de um dia filtrado por cartão | http://localhost:3333/extract/day | GET
Extrato das transações de um mês filtrado por cartão | http://localhost:3333/extract/month  | GET
Extrato das transações realizadas com um determinado cartão | http://localhost:3333/cards | GET
Listar todos os cartões da empresa | http://localhost:3333/cards/me | GET
Listar o balancete da empresa | http://localhost:3333/companies/balance | GET

Cada rota possui a sua documentação explicando como acessar e o que é necessário para utilizar cada recurso. Você pode ler a documentoação de cada rota em:

- [Rota de criar uma conta](./docs/createCompany.md)
- [Rota de fazer login](./docs/login.md)
- [Rota de cadastrar um novo cartão](./docs/createCard.md)
- [Rota de cadastrar uma nova transação](./docs/createTransactions.md)
- [Rota de lista a ultima transação realizada](./docs/lastTransaction.md)
- [Rota de extrato das transações de um dia filtrado por cartão](./docs/extract.md#####/day)
- [Rota de extrato das transações de um mês filtrado por cartão](./docs/extract.md#####/month)
- [Rota de extrato das transações realizadas com um determinado cartão](./docs/extract.md#####/card)
- [Rota de listar todos os cartões da empresa](./docs/listAllCardsOfCompany.md)
- [Rota de listar o balancete da empresa](./docs/getBalance.md)

## 🚀 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Feito com 💜 by [J-keven](github.com/j-keven) :wave: [Entre na nossa comunidade!](https://discordapp.com/invite/gCRAFhc)
