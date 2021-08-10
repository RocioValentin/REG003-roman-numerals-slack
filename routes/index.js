const { Router } = require('express');
const router = Router();
const qs = require('querystring')
const pjson = require('../package.json');
const npm = require('rocio-valentin-roman-numerals')


//console.log('guasgusgd', Object.keys(npm));

router.get('/',(req, res) => {
    res.json({
        'name': pjson.name,
        'version': pjson.version
    })
});

router.post('/',(req, res, next) => {
   try{
    const { application } = req.headers;
    //console.log('headers', application )
    const slack = qs.parse(application);
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
      })
   } catch (err) {
       return next(404)
   }
});

module.exports = router

/* module.exports = (app, nextMain) => {
    app.get('/',(req,res) => {
        res.send('hello world')
    })
    nextMain();
} */