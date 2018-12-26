// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client)=> {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5c23578b52cf5529ec8397c0')}, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // })
  //   .then(result => console.log(result));

  db.collection('Users').findOneAndUpdate({_id: new ObjectID('5c1ccbde96c07f0bc00bca76')}, {
    $set: {
      name: 'Kirti Jha'
    },
    $inc: {
      age: 2
    }
  }, {
    returnOriginal: false
  })
    .then(result => console.log(result));

  // client.close();
});