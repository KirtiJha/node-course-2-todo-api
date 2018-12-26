// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client)=> {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5c1cca7185d74306e0dbee43')
  // })
  //   .toArray()
  //   .then((docs) => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   })
  //   .catch(err => console.log('Unable to fetch todos', err));

  // db.collection('Todos').find()
  //   .count()
  //   .then((count) => {
  //     console.log(`Todos count: ${count}`);
  //   })
  //   .catch(err => console.log('Unable to fetch todos', err));

  let users = db.collection('Users').find({
    name: 'Kirti Jha'
  });
  users.toArray()
  .then((user) => {
    console.log(JSON.stringify(user, undefined, 2));
  })
  users.count()
  .then(count => console.log(`Users Count: ${count}`))
  .catch(err => console.log('Unable to fetch user', err));

  // client.close();
});