const router = require('express').Router();
const pack = require('./package.json');
const error = require('./error.js').error;
const ws = require('./webscrapping.js');

router.get('/version', function(req,res){
    res.send({'version': pack.version});
});

router.get('/titulaciones', function(req,res){
    ws.getTitulaciones().then(t_list => res.send(t_list));
});

router.get('/asignaturas', function(req,res){
    if(!req.body.hasOwnProperty('titulacion')){
        res.send(error('UE001'));
    }else{
        ws.getAsignaturas(req.body.titulacion).then(a_list => res.send(a_list))
        .catch(error_code => res.send(error(error_code)));
    }
});

module.exports.router = router;