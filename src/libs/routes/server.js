import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import gql from 'graphql-tag';
import { buildASTSchema }  from 'graphql';

//https://developer.okta.com/blog/2018/10/11/build-simple-web-app-with-express-react-graphql
const USER = [
  { id: 0, email: "abc@gmail.com", password: "qwerty123", friends: [11, 22] },
  { id: 1, email: "xyz@gmail.com", password: "qwerty123", friends: [0, 2] },
  { id: 2, email: "qwerty@gmail.com", password: "qwerty123", friends: [1, 0] },
];
const FRIENDS = [
  { id : 11, name: "ayush", messages: ["hi"] },
  { id : 22, name: "hello", messages: ["helloo"] },
  { id : 33, name: "xyz", messages: ["hi xyz"] },
]

const schema = buildASTSchema(gql`

  type Query {
    getAllUser: [User]!
    getUser(id: Int!): User!
    getFriend: [Friends]!
  }

  type User{
  id: Int
  email: String!
  password: String!
  friends: [Friends]
}
  type Friends {
    id: Int
    name: String!
    messages: [String]
  }
`);

const mapPost = (value, id) => value;


const root = {
  getAllUser: () => USER,
  getFriend: () => FRIENDS,
  getUser: ({ id }) => mapPost(USER[id], id),
  get1: ({ id }) => mapPost(FRIENDS[id], id),
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);