# Desafio AWS Serverless - versão iniciante

Projeto criado como parte de um desafio de introdução a AWS Serverless e Infraestrutura como Código (IaC)

A ideia foi criar uma API pequena para cadastrar e consultar itens, utilizando serviços gerenciados da AWS e o Serverless Framework

## Arquitetura

Cliente -> API Gateway -> Lambda -> DynamoDB

O arquivo `serverless.yml` descreve tanto as funções quanto a tabela DynamoDB. Assim, a infraestrutura pode ser criada pelo próprio projeto
## Tecnologias

- Node.js
- Serverless Framework
- AWS Lambda
- Amazon API Gateway (HTTP API)
- Amazon DynamoDB
- AWS SDK for JavaScript v3

## Endpoints

### Criar item

`POST /items`

Exemplo de body:

```json
{
  "nome": "Meu primeiro item",
  "descricao": "Item criado usando Lambda"
}
```

### Lista itens

`GET /items`

### Buscar item por ID

`GET /items/{id}`

## Como executar

É necessário ter Node.js instalado e credenciais AWS configuradas na máquina.

Instalar as dependências:

```bash
npm install
```

deploy:

```bash
npx serverless deploy
```

Ao final do deploy o Serverless mostra as URLs criadas pelo API Gateway

Pra remover os recursos depois dos testes:

```bash
npx serverless remove
```

## Estrutura

```text
aws-serverless-iniciante/
|-- src/
|   `-- handler.js
|-- .gitignore
|-- package.json
|-- README.md
`-- serverless.yml
```

## O que eu aprendi

Nesse projeto eu pratiquei conceitos básicos de arquitetura Serverless, criação de funções Lambda, API Gateway, DynamoDB e Infraestrutura como Código usando o Serverless Framework

Também entendi melhor como uma função Lambda recebe uma requisição HTTP, acessa um banco NoSQL e devolve uma resposta para a API.

## Referência

`dio-live-serverless-2907`
