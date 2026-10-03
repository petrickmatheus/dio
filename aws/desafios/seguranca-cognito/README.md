# API Serverless com Amazon Cognito

Projeto prático de estudo de autenticação e autorização de APIs na AWS

A ideia foi criar uma API REST pequena utilizando serviços serverless e protegendo o cadastro de itens com Cognito.

## Arquitetura

```text
Usuário
   |
   | token
   v
Amazon Cognito
   |
   v
API Gateway
   |
   v
AWS Lambda
   |
   v
Amazon DynamoDB
```

## Serviços utilizados

- Amazon Cognito
- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Serverless Framework
- Node.js
- Postman para testes

## Endpoints

### GET /items

Lista os itens cadastrados

### POST /items

Cadastra um item e está protegido pelo autorizador do Cognito

exemplo de body:

```json
{
  "id": "001",
  "name": "Livro AWS",
  "price": 50
}
```

Pra acessar o POST é necessário enviar um token válido no header `Authorization`.

## Como executar

É necessário ter Node.js, AWS CLI configurada e credenciais AWS válidas.

iNSTALAR as dependências:

```bash
npm install
```

Faça o deploy:

```bash
npx serverless deploy
```

Ao terminar, o Serverless mostra os endpoints criados. O deploy também cria o User Pool do Cognito, o App Client e a tabela DynamoDB

## Criando um usuário para teste

Depoi do deploy, acesse o Amazon Cognito no console da AWS e abra o User Pool criado pelo projeto

Crie um usuário de teste usando um e-mail válido. Para fins de estudo, também é possível administrar o usuário pelo próprio console da AWS

Depois de autenticar e obter um token, envie no Postman:

```text
Authorization: TOKEN_DO_COGNITO
```

Então faça uma requisição POST pra `/items`.

Sem um token válido a API deve negar o acesso ao endpoint protegido.

## O que aprendi

Aprendi conceitos básicos de uma aplicação serverless, criação de APIs REST, funções Lambda, armazenamento no DynamoDB e principalmente autenticação e autorização com o Cognito

## Remover recursos

Para não deixar recursos desnecessários na AWS depois dos testes:

```bash
npx serverless remove
```

## Referência

Referência no desafio de segurança Serverless com Cognito.