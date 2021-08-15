const express = require('express');
const app = express();
// const routes = require('./routes');
//const cors = require('cors');
const config = require('./config');
//const pkg = require('./package.json');

const { port } = config;
app.use(express.json());
app.set('port', port);

app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index'))
/*app.get('/',(req,res) => {
  res.json('hello world')
});*/

const server = app.listen(app.get('port'), () => {
  console.info(`App listening on port ${app.get('port')}`);
});

module.exports = { app, server };
/* routes(app, (err) => {
    if (err) {
      throw err;
    }
  
    app.use(errorHandler);
  
    app.listen(port, () => {
      console.info(`App listening on port ${3000}`);
    });
  }); */