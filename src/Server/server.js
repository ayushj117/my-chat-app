import { ApolloServer, gql, PubSub, withFilter } from "apollo-server";
import { USER } from "./constants";

const pubsub = new PubSub();
const typeDefs = gql`
  type Query {
    getAllUser: [User]!
    getUser(email: String!): User!
    getFriends(id: Int!): User!
    friends(email: String!): Friends!
    getMessage(to: String!, from: String!, data: String!): Message!
  }

  type Subscription {
    messageAdded(from: String!): Message!
  }

  type Mutation {
    addMessage(to: String!, from: String!, data: String!): Message!
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
    to: String!
    from: String!
    fromMessage: [String]
    toMessage: [String]
  }
`;

const MESSAGE_ADDED = "MESSAGE_ADDED";
const resolvers = {
  Query: {
    getUser: (parent, { email }, context) => {
      return USER.filter(data => data.email === email)[0];
    },
    getFriends: (parent, { id }, context) => {
      let result;
      USER.forEach(res => {
        if (res.id === id) {
          res.friends.forEach(data => {
            USER.forEach(users => {
              if (data.id === users.id) {
                result = users;
              }
            });
          });
        }
      });
      console.log("aa", result);
      return result;
    },
     getAllUser: async parent => {
      console.log("sds---34---", USER[0].friends[0].id);

      return await USER;
    },

    getMessage: (parent, { to, from, data }, context, info) => {
      let result;
      USER.forEach(res => {
        res.messages.forEach(msg => {
          if (msg.to === to) {
            result = msg;
          }
        });
      });
      console.log("-----97---", result);
      return result;
    },

    friends: (parent, { email }) => {
      let list = [];
      USER.forEach(res => {
        if (res.email === email) {
          res.friends.forEach(friend => {
            USER.forEach(user => {
              if (friend.id === user.id) {
                list.push(user.name);
              }
            });
          });
        }
      });
      console.log("----81---", list);
      return { name: list };
    }
  },
  Subscription: {
    messageAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => {
        console.log('asda inside subs' );
        pubsub.asyncIterator([MESSAGE_ADDED]);
      } 
    }
  },
  Mutation: {
    addMessage: (parent, { to, from, data }, context, info) => {
      let result;
      USER.forEach(res => {
        res.messages.forEach(msg => {
          if (msg.to === to) {
            msg.toMessage.push(data);
            result = msg;
          }
        });
      });
      pubsub.publish(MESSAGE_ADDED, { messageAdded: result });
      console.log("-----97---", result);
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
