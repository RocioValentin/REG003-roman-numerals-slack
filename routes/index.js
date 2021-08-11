const { Router } = require('express');
const router = Router();
const qs = require('querystring')
const pjson = require('../package.json');
const npm = require('rocio-valentin-roman-numerals')


//console.log('guasgusgd', Object.keys(npm));

router.get('/',async (req, res) => {
    res.json({
        'name': pjson.name,
        'version': pjson.version
    })
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  console.log(text)
  const [ name, param ] = text.split('+');
  console.log(name, param)

  let text_respond = "";
  
  if ( name === 'parse' ) {
      try {
          text_respond = npm.parse(param)
        } catch(err) {
            text_respond = err.message
        }
     
    } else if ( name === 'stringify') {
        try {
            text_respond = npm.stringify(Number(param))
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
    /* const { application } = req.headers;
    //console.log('headers', application )
    const slack = qs.parse(text);
    //console.log(slack)
    const text_slack = slack.text
    //console.log(text_slack)
    const [ name, param ] = text_slack.split(' ');
    //console.log('json slack', typeof(name), typeof(param));
    let text_respond;
    if ( name === 'parse' ) {
        text_respond = npm.parse(param)
    } else if ( name === 'stringify') {
        text_respond = npm.stringify(Number(param))
    } else {
        text_respond = 'error'
    }
    //const text = npm.parse('I');
    //console.log('aaaa', text);
    return res.json({
        "response_type": slack.channel_name,
        "text": text_respond
      }) */
      res.json({
        "response_type": 'in channel',
        "text": text_respond
      })
});

module.exports = router

/* module.exports = (app, nextMain) => {
    
    app.get('/',(req,res) => {
        res.send('hello world')
    })
    nextMain();
} 
// https://rv-roman-numerals.herokuapp.com/ */