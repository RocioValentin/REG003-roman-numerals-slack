const express = require('express');
const app = express();
const routes = require('./routes');
//const cors = require('cors');
const config = require('./config');
//const pkg = require('./package.json');

const { port } = config;
app.use(express.json());
app.set('port', port);

app.use(express.urlencoded({ extended: false }));
app.use(require('./routes/index'))
/*app.get('/',(req,res) => {
  res.json('hello world')
});*/

app.listen(app.get('port'), () => {
  console.info(`App listening on port ${app.get('port')}`);
});
/* routes(app, (err) => {
    if (err) {
      throw err;
    }
  
    app.use(errorHandler);
  
    app.listen(port, () => {
      console.info(`App listening on port ${3000}`);
    });
  }); */