const rp = require('request-promise');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const config = require('./config.json');
const error = require('./error.js').error;

const common_options = {
    encoding: null,
    transform: function(html){
        return iconv.decode(html, 'ISO-8859-1');
    }
};

class WebScrappingError extends Error {};

module.exports.getTitulaciones = function(){
    const options = {
        uri: config.urls.cra_form,
        ...common_options
    };
    return rp(options).then(function(data){
        try{
            var $ = cheerio.load(data);
            var list = [];
            $('.listaG[name=tpp1]').children().each(function(i, elem){
                if(i != 0)
                    list.push({'code':elem.attribs.value, 'name':elem.firstChild.data.replace(/^\s*\S+\s*/, '')});
            })
            return list;
        }catch(e){
            throw new WebScrappingError();
        }
    }).catch(WebScrappingError, function(e){
        return error('SE002');
    }).catch(function(e){
        return error('SE001');
    });
}

module.exports.getAsignaturas = function(t_code){
    const options = {
        uri: config.urls.cra_form,
        qs: {
            tTit: t_code,
            tAsig: '---'
        },
        ...common_options
    };
    return rp(options).then(function(data){
        try{
            var $ = cheerio.load(data);
            var list = [];
            $('.listaG[name=ttp2]').children().each(function(i, elem){
                if(i != 0)
                    list.push({'code':elem.attribs.value.match(/^\S+/)[0], 'name':elem.firstChild.data.replace(/^\s*\S+\s*/, '')});
            })
            return list;
        }catch(e){
            throw new WebScrappingError();
        }
    }).catch(WebScrappingError, function(e){
        return error('SE002');
    }).catch(function(e){
        return error('SE001');
    });
}

module.exports.getReservas = function(t_code, a_code, from_date, to_date, group){
    const options = {
        method: 'POST',
        uri: config.urls.cra_post,
        form: {
            tTit: t_code,
            tAsig: a_code,
            cGrupo: group,
            calendarDate1: from_date,
            calendarDate2: to_date
        },
        ...common_options
    }

    return rp(options).then(function(data){
        try {
            var $ = cheerio.load(data);
            var list = [];
            $('.tablaDatos').children().children().each(function(i, elem){
                if(i != 0){
                    var reserva = {};
                    var tdlist = $(elem).children('td');
                    reserva.fecha = tdlist[0].firstChild.firstChild.data;
                    reserva.dia = tdlist[3].firstChild.data;
                    var hora = tdlist[4].firstChild.data.split('-');
                    reserva.hora_inicio = hora[0];
                    reserva.hora_fin = hora[1];
                    reserva.aula = {};
                    reserva.aula.codigo = tdlist[5].firstChild.firstChild.data.match(/^\S+/)[0];
                    reserva.aula.detalles = tdlist[5].firstChild.firstChild.data.replace(/^\s*\S+\s*/, '');
                    if (tdlist[6].firstChild){
                        reserva.profesor = tdlist[6].firstChild.data;
                    }
                    if (tdlist[8].firstChild){
                        reserva.grupo = tdlist[8].firstChild.data;
                    }
                    list.push(reserva);
                }
            })
            return list;
        }catch(e){
            throw new WebScrappingError();
        }
    }).catch(WebScrappingError, function(e){
        return error('SE002');
    }).catch(function(e){
        return error('SE001');
    });
}