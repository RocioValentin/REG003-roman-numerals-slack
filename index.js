const express = require('express');
const app = express();
//const cors = require('cors');
const config = require('./config');
//const pkg = require('./package.json');

const { port } = config;
app.use(express.json());
app.set('port', port);

app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index'))


const server = app.listen(app.get('port'), () => {
  console.info(`App listening on port ${app.get('port')}`);
});

module.exports = { app, server };
