const express = require('express');
const bodyParse = require('body-parser');
const { userRoute } = require('./routs/user_routs');

const app = express();
app.use(bodyParse.urlencoded({ extended: false }))

const port = 3000;

userRoute(app)


app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log('Api rodando na porta 3000'))