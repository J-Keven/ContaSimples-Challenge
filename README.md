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

A Aplicação se encontra hospedada no endereço https://deploychallange.jhonnasnunes.com e voce pode segir a documentação de cada [rota](https://github.com/J-Keven/ContaSimples-Challenge#rotas) ou você pode seguir o guia de como fazer o download e as configurações básicas para executar a plicação em um ambiente local. Para acessa o guia [click aqui](./docs/guideInstall.md).
## Rotas

> A aplicação foi desenvolvida utilizando o padrão rest api e, de acordo com o padrão, a  aplicação utiliza a estrutura de dados **json** para receber os dados de uma requisição e enviar dados em uma resposta.

A aplicação contém os seguintes recursos abaixo e você pode acessar cada recurso da aplicação fazendo requições no endereço https://deploychallange.jhonnasnunes.com ou seguindo o passo a passo para executar a aplicação local.

> ⚠ Atenção: As urls descritas nesta documentação sempre começam com ```baseURL```, então é essencial que ao fazer uma requisição para cada uma dessa urls, vocẽ substeitua o baseURL por https://deploychallange.jhonnasnunes.com para utilizar recursos da aplicação "deployada" ou http://localhost:3333 para utilizar recursos da aplicação de forma local(No seu prórpio computador).

Rota | url | Método HTPP
---- | --- | ------
Criar uma conta | baseURL/companies | POST
Fazer login | baseURL/login | POST
Cadastrar um novo cartão | baseURL/cards | POST
Cadastrar uma nova transação | baseURL/transactions | POST
Lista a ultima transação realizada | baseURL/companies/me/last | GET
Extrato das transações de um dia filtrado por cartão | baseURL/extract/day | GET
Extrato das transações de um mês filtrado por cartão | baseURL/extract/month  | GET
Extrato das transações realizadas com um determinado cartão | baseURL/cards | GET
Listar todos os cartões da empresa | baseURL/cards/me | GET
Listar o balancete da empresa | baseURL/companies/balance | GET

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
