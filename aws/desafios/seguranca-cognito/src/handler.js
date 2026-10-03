const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb')

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)
const tableName = process.env.TABLE_NAME

// cadastra um item. Precisa de login
module.exports.createItem = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')

    if (!body.id || !body.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Informe id e name' })
      }
    }

    const item = {
      id: body.id,
      name: body.name,
      price: body.price || 0
    }

    await dynamo.send(new PutCommand({
      TableName: tableName,
      Item: item
    }))

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Item cadastrado', item })
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao cadastrar item' })
    }
  }
}

// lista dos itens cadastrados
module.exports.listItems = async () => {
  try {
    const result = await dynamo.send(new ScanCommand({ TableName: tableName }))

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items || [])
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao buscar itens' })
    }
  }
}
