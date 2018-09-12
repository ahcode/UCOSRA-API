const router = require('express').Router();
const pack = require('./package.json');
const utils = require('./utils.js');
const ws = require('./webscrapping.js');

router.get('/version', function(req,res){
    if(pack.hasOwnProperty('version'))
        res.send({'version': pack.version});
    else
        res.send(utils.error('SE001'));
});

router.get('/titulaciones', function(req,res){
    ws.getTitulaciones().then(t_list => res.send(t_list));
});

router.get('/asignaturas', function(req,res){
    ws.getAsignaturas(req.body.titulacion).then(a_list => res.send(a_list));
});

module.exports.router = router;