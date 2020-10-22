### **Pré-requisitos**

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
  $ yarn dev:start

  # ou

  $ npm run dev:start
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

Após fazes as alterações necessárias para rodar a aplicação e executar a plicação você poderá acessar os recursos da aplicação.

A aplicação vai estar executando em um ambiente local, ou seja, na sua maquina. Então o a url começa com **http://localhost**.
Se preferir você pode trocar o  'localhost' pelo IP local da sua máquina.

A aplicação está utilizano a porta **3333** da sua máquina.

Tendo em vista os casos acima o endereço da apliação local é **http://localhost:3333**.
