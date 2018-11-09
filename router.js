const router = require('express').Router();
const pack = require('./package.json');
const error = require('./error.js').error;
const ws = require('./webscrapping.js');
const dateformat = require('dateformat');

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

router.get('/reservas', function(req,res){
    if(req.body.hasOwnProperty('titulacion')){
        var titulacion = req.body.titulacion;
    }else{
        res.send(error('UE001'));
    }
    if(req.body.hasOwnProperty('asignatura')){
        var asignatura = req.body.asignatura;
    }else{
        res.send(error('UE002'));
    }
    if(req.body.hasOwnProperty('fecha_ini')){
        var fecha_ini = req.body.fecha_ini;
    }else{
        var fecha_ini = dateformat(new Date(), 'dd-mm-yyyy');
    }
    if(req.body.hasOwnProperty('fecha_fin')){
        var fecha_fin = req.body.fecha_fin;
    }else{
        var fecha_fin = dateformat(new Date(), 'dd-mm-yyyy');
    }
    if(req.body.hasOwnProperty('grupo')){
        var grupo = req.body.grupo;
    }else{
        var grupo = "T";
    }

    ws.getReservas(titulacion, asignatura, fecha_ini, fecha_fin, grupo).then(r_list => res.send(r_list));
});

module.exports.router = router;