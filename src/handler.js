const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand } = require('@aws-sdk/lib-dynamodb')
const { randomUUID } = require('crypto')

const client = new DynamoDBClient({})
const banco = DynamoDBDocumentClient.from(client)
const tabela = process.env.TABLE_NAME

// padroniza as respostas da API
function resposta(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  }
}

module.exports.criarItem = async (event) => {
  try {
    const dados = JSON.parse(event.body || '{}')

    if (!dados.nome) {
      return resposta(400, { mensagem: 'O campo nome e obrigatorio' })
    }

    const item = {
      id: randomUUID(),
      nome: dados.nome,
      descricao: dados.descricao || '',
      criadoEm: new Date().toISOString()
    }

    await banco.send(new PutCommand({
      TableName: tabela,
      Item: item
    }))

    return resposta(201, item)
  } catch (erro) {
    console.log('erro ao criar item', erro)
    return resposta(500, { mensagem: 'Erro ao criar item' })
  }
}

module.exports.listarItens = async () => {
  try {
    const resultado = await banco.send(new ScanCommand({
      TableName: tabela
    }))

    return resposta(200, resultado.Items || [])
  } catch (erro) {
    console.log('erro ao listar', erro)
    return resposta(500, { mensagem: 'Erro ao listar itens' })
  }
}

module.exports.buscarItem = async (event) => {
  try {
    const id = event.pathParameters.id

    const resultado = await banco.send(new GetCommand({
      TableName: tabela,
      Key: { id: id }
    }))

    if (!resultado.Item) {
      return resposta(404, { mensagem: 'Item nao encontrado' })
    }

    return resposta(200, resultado.Item)
  } catch (erro) {
    console.log('erro ao buscar item', erro)
    return resposta(500, { mensagem: 'Erro ao buscar item' })
  }
}
