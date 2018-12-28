const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove
// Todo.remove({})
//   .then(result => console.log(result));

Todo.findByIdAndRemove('5c25fe7d9b37853c68d6a9a2')
 .then(todo => {
  console.log(todo);
 });