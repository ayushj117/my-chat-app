import { ApolloServer, gql } from "apollo-server";
import { USER } from "./constants";

const typeDefs = gql`
  type Query {
    getAllUser: [User]!
    getUser(id: Int!): User!
    getFriends(id: Int!): User!
    friends(email: String!): Friends!
  }

  type Mutation {
    addMessage(to: Int!, from: Int!, data: String!): Message!
  }

  type Friends {
    name: [String]!
  }

  type User {
    id: Int
    name: String
    email: String!
    password: String!
    friends: [Friends]
    messages: [Message]
  }

  type Message {
    to: Int!
    from: Int!
    message: [String]
  }
`;

const resolvers = {
  Query: {
    getUser: (parent, { id }, context) => {
      return USER.filter(data => data.id === id)[0];
    },
    getFriends: (parent, { id }, context) => {
      let result;
      USER.forEach(res => {
        if (res.id === id) {
          // result = res;
          res.friends.forEach(data => {
            USER.forEach(users => {
              console.log("sd", users.id, "sads", data);
              if (data.id === users.id) {
                console.log("####", users);
                result = users;
              }
            });
          });
        }
      });
      console.log("aa", result);
      return result;
    },
    getAllUser: parent => {
      console.log("sds---34---", USER[0].friends[0].id);

      return USER;
    },
    friends: (parent, { email }) => {
      let list = [];
      USER.forEach(res => {
        if (res.email === email) {
          console.log('--adasd---', res)
          res.friends.forEach(friend => {
            console.log("---74---", res.id, "----", friend.id);
            USER.forEach((user) => {
              if (friend.id === user.id) {
                console.log("---75---", user.name);
                list.push(user.name);
              }
            })
          });
        }
      });
      console.log("----81---", list);
      return {name: list};
    }
  },
  Mutation: {
    addMessage: (parent, { to, from, data }, context, info) => {
      console.log("sd222", to, from, data);
      let result;
      USER.forEach(res => {
        res.messages.forEach(msg => {
          console.log("2222", msg, to);
          if (msg.to === to) {
            msg.message.push(data);
            result = msg;
            console.log("sddas", msg);
          }
        });
      });
      console.log('-----97---', result);
      return result;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
