
const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

// 定义 schema，查询类型
const schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    salary(city: String): Int
  }
  type Query {
    getClassMates(classNo: Int!): [String]
    account(userName: String): Account
  }
`)

// 为每个 API 端点提供一个解析器函数
var rootValue = {
  getClassMates ({ classNo }) {
    const obj = {
      1: ['a', 'b'],
      2: ['c', 'd'],
    }
    return obj[classNo]
  },

  account ({ userName }) {
    return {
      name: userName,
      sex: '男',
      age: 19,
      salary: ({ city }) => {
        return ['北京', '深圳', '广州', '上海'].includes(city) ? 10000 : 3000
      },
    }
  }
}

// query{
// # getClassMates(classNo:3)
//   account(userName:"aa") {
//     name,
//     salary(city:"北京")
//   }
// }

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,
}))

app.use(express.static('public'))

app.listen(3000)
console.log('server listening on port 3000')
