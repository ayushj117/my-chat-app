let id = 5;
let USER = [
  { id: 0, name: "name0", email: "abc@gmail.com", password: "Qwerty123", friends: [1, 4], 
  messages: [
    { to: 1, from: 0, message: ["hi"]},
    { to: 4, from: 0, message: ["asdasf"]},
  ] },
  { id: 1, name: "name1", email: "xyz@gmail.com", password: "Qwerty123", friends: [2],
  messages: [
    { to: 2, from: 1, message: ["hello"]}
  ] },
  { id: 2, name: "name2", email: "qwerty@gmail.com", password: "Qwerty123", friends: [0, 1],
  messages: [
    { to: 0, from: 2, message: ["as"]},
    { to: 1, from: 2, message: ["sd"]},
  ] },
  { id: 3, name: "name3", email: "abc1@gmail.com", password: "Qwerty123", friends: [2, 4],
  messages: [
    { to: 2, from: 3, message: ["cvcb"]},
    { to: 4, from: 3, message: ["bmn"]},
  ] },
  { id: 4, name: "name4", email: "abc2@gmail.com", password: "Qwerty123", friends: [3],
  messages: [
    { to: 3, from: 4, message: ["rty"]}
  ] },
];

export {
  USER,
  id,
};
