import { ApolloServer, gql } from 'apollo-server';
import { USER } from './constants';

// The GraphQL schema
const typeDefs = gql`
type Query {
  getAllUser: [User]!
  getUser(id: Int!): User!
  getFriends(id: Int!): User!
}

type Mutation {
  addMessage(to: Int!, from: Int!, data: String!): User!
}

type User{
id: Int
name: String!
email: String!
password: String!
friends: [User]
messages: [Message]
}

type Message {
  to: Int!
  from: Int!
  message: [String]
}
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getAllUser: () => {
      console.log('sds', USER[4].messages);
      return USER;
      },
      getUser: (parent, { id }, context) => {
        return USER.filter(data => data.id === id)[0];
      },
      getFriends: (parent, { id }, context) => {
        let result;
        USER.forEach((res) => {
          if (res.id === id) {
            // result = res;
            res.friends.forEach((data) => {
              USER.forEach((users) => {
              console.log('sd', users.id, 'sads', data);
              if (data === users.id) {
                console.log('####', users);
                result = users;
              }
              })

            })
          }
        })
        console.log('aa', result);
        return result;
      },
  },
  Mutation: {
    addMessage: (parent, { to, from, data }, context, info) => {
      console.log('sd222', to, from, data);
      let result;
      USER.forEach((res) => {
        result = res;
        res.messages.forEach((msg) => {
          console.log('2222', msg, to);
          if (msg.to === to) {
            msg.message.push(data);
            console.log('sddas', msg);
          }
        })
      })
      return result;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});