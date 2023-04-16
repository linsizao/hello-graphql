const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

// 定义 schema，查询类型 (基本类型 String,Int,Float,Boolean,ID)
const schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
  }
  type Query {
    hello: String
    test: String
    age: Int
    access: Account
  }
`)

// 定义查询
var rootValue = {
  hello: () => {
    return "Hello world!"
  },
  test: () => {
    return "This is a Test"
  },
  age: () => { return 18 },
  access: () => {
    return {
      name: 'lin',
      age: 18,
      sex: '男'
    }
  }
}

// query{
//   hello,
//     test,
//     age,
//     access {
//     name
//     age
//     sex
//   }
// }

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,
}))

app.listen(3000)
console.log('server listening on port 3000')
