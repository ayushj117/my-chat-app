import { ApolloServer, gql, PubSub, withFilter } from "apollo-server";
import { USER } from "./constants";

const pubsub = new PubSub();
const typeDefs = gql`
  type Query {
    getAllUser(email: String!): [User]!
    getUser(email: String!): User!
    getFriends(email: String!, friend: [String]!): Friends!
    friends(email: String!): Friends!
    getMessage(to: String!, from: String!): Message!
  }

  type Subscription {
    messageAdded: Message!
  }

  type Mutation {
    addMessage(to: String!, from: String!, data: String!): Message!
    addUser(name: String!, email: String!, password: String!): User!
    addFriends(friendNames: [String]!, fromName: String!): User!
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
    getFriends: (parent, { email, friend }, context) => {
      let list = [];
      USER.forEach(res => {
        if (res.email === email) {
          friend.push(res.name);
          console.log("asdsad", res.name, friend);
        }
        if (!friend.includes(res.name)) {
          console.log('asdasd@@@@@@@', res.name)
          list.push(res.name);
        }
      });
      // USER.forEach(user => {
      //     if (!friend.includes(user.name)) {
      //       console.log('asdasd@@@@@@@', user.name)
      //       list.push(user.name);
      //     }
      // });
      console.log("----81---", list);
      return { name: list };
    },
    getAllUser: (parent, { email }) => {
      const allUser = USER.filter(user => user.email !== email);
      return allUser;
    },

    getMessage: (parent, { to, from }, context, info) => {
      let result;
      USER.forEach(res => {
        res.messages.forEach(msg => {
          if (msg.to === to) {
            result = msg;
          }
        });
      });
      console.log("-----78---", result);
      return result;
    },

    friends: (parent, { email }) => {
      let list = [];
      USER.forEach(res => {
        if (res.email === email) {
          res.friends.forEach(friend => {
            USER.forEach(user => {
              if (friend.name === user.name) {
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
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED])
    }
  },
  Mutation: {
    addMessage(parent, { to, from, data }, context, info) {
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
      console.log("-----116---", result);
      return result;
    },
    addUser(parent, { name, email, password }) {
      const filteredUser = USER.filter(user => user.email === email);
      if (filteredUser.length === 0) {
        const newUser = {
          id: USER.length,
          name,
          email,
          password,
          friends: [],
          messages: []
        };
        USER.push(newUser);
        return newUser;
      } else {
        return filteredUser[0];
      }
    },
    addFriends(parent, { friendNames, fromName }) {
      const filteredUser = USER.filter(user => user.name === fromName);
      if (filteredUser) {
        filteredUser.map(mappedUser => {
          friendNames.forEach(element => {
            mappedUser.friends.push({ name: element });
            console.log(mappedUser.friends);
          });
        });
        return filteredUser[0];
      } else {
        return filteredUser[0];
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { pubsub }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
