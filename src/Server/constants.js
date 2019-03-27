let id = 5;
let USER = [
  { id: 0, name: "Ayush", email: "abc@gmail.com", password: "Qwerty123", friends: [{id: 1}, {id: 4}], 
  messages: [
    { to: "name1", from: "abc@gmail.com", fromMessage: ["hi"], toMessage: []},
    { to: "name4", from: "abc@gmail.com", fromMessage: ["asdasf"], toMessage: []},
  ] },
  { id: 1, name: "name1", email: "xyz@gmail.com", password: "Qwerty123", friends: [{id: 2}],
  messages: [
    { to: "name2", from: "xyz@gmail.com", fromMessage: ["hello"], toMessage: []}
  ] },
  { id: 2, name: "name2", email: "qwerty@gmail.com", password: "Qwerty123", friends: [{id: 0}, {id: 1}],
  messages: [
    { to: "Ayush", from: "qwerty@gmail.com", fromMessage: ["Hi", "Welcome"], toMessage: []},
    { to: "name1", from: "qwerty@gmail.com", fromMessage: ["sd"], toMessage: []},
  ] },
  { id: 3, name: "name3", email: "abc1@gmail.com", password: "Qwerty123", friends: [{id: 2}, {id: 4}],
  messages: [
    { to: "name2", from: "abc1@gmail.com", fromMessage: ["cvcb"], toMessage: []},
    { to: "name4", from: "abc1@gmail.com", fromMessage: ["bmn"], toMessage: []},
  ] },
  { id: 4, name: "name4", email: "abc2@gmail.com", password: "Qwerty123", friends: [{id: 3}],
  messages: [
    { to: "name3", from: "abc2@gmail.com", fromMessage: ["rty"], toMessage: []}
  ] },
];

export {
  USER,
  id,
};
