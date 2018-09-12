const router = require('express').Router();
const pack = require('./package.json');
const utils = require('./utils.js');

router.get('/version', function(req,res){
    if(pack.hasOwnProperty('version'))
        res.send({'version': pack.version});
    else
        res.send(utils.error('SE001'));
});

module.exports.router = router;