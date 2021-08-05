const express = require('express');
const cors = require('cors')
const app = express();
const Knex = require('knex');
const config = require('./knexfile');
const knex = Knex(config.development);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { UserRoute } = require('./routes/user.route');
const UserController = require('./controllers/user.controller');
const UserService = require('./services/user.service');

const userService = new UserService(knex)
const userController = new UserController(userService);
const userRoute = UserRoute(userController);
app.use('/user', userRoute);

app.listen(3000, () => console.log('localhost:3000'))

