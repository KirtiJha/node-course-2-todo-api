require('./config/config');

let _ = require('lodash')
let express = require('express');
let bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({todos})
    })
    .catch(err => res.status(400).send(err));
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    })
    .catch(err => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    })
    .catch(err => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.send({todo});
    })
    .catch(err => res.status(400).send());
});

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save()
    .then(() => {
     return user.generateAuthToken();
    })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});


app.get('/users/me', authenticate, (req, res) => {    // PRIVATE ROUTE WITH MIDDLEWARE
 res.send(req.user);
});

app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
    });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch(err => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {
  app
};

