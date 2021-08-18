const { Router } = require('express');
const router = Router();
//const qs = require('querystring')
const { getInfo } = require('./controller')
const pjson = require('../package.json');
const { parse, stringify} = require('rocio-valentin-roman-numerals')


router.get('/', getInfo );

router.post('/',  (req, res) => {
  const { text } = req.body;

  const [ name, param ] = text.split(' ');

  let text_respond = "";
  
  if ( name === 'parse' ) {
      try {
          text_respond = parse(param)
        } catch(err) {
            text_respond = err.message
        }
     
    } else if ( name === 'stringify') {
        try {
            text_respond = stringify(Number(param))
        } catch (err) {
            text_respond = err.message
        }
    } else {
        try {
            text_respond = 'error';
        } catch (err) {
            text_respond = err.message
        }
    }

    if (text === 'help'){
        try {
            text_respond = 'Convert form roman to arabic: /parse 3 || Convert form arabic to roman: /stringify V '
        } catch (err) {
            text_respond = err.message
        }
    }
    if (text === 'version'){
        try {
            text_respond = pjson.version;
        } catch (err) {
            text_respond = err.message
        }
    }
      res.json({
        "response_type": 'in channel',
        "text": text_respond
      })
});

module.exports = router

/* https://rv-roman-numerals.herokuapp.com/ */