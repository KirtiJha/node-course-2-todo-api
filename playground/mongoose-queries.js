const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let userId = '5c247e5a9d91a033ec45916c11';

// let id = '5c24b545a4a39149641377e311';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// })
//   .then(todos => console.log('Todos', todos));

//   Todo.findOne({
//     _id: id
//   })
//     .then(todo => console.log('Todo', todo));

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Id not found');
//     }
//     console.log('Todo by ID', todo);
//   })
//   .catch(err => console.log(err));

User.findById(userId)
  .then(user => {
    if (!user) {
      console.log('User not found');
    }
    console.log('User: ', user);
  })
  .catch(err => console.log(err));

