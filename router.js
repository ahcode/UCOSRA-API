const router = require('express').Router();
const pack = require('./package.json');

router.get('/version', function(req,res){
    res.send({'version': pack.version});
});

module.exports.router = router;