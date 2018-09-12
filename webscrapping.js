const rp = require('request-promise');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const config = require('./config.json');

const common_options = {
    'encoding': null,
    'transform': function(html){
        return iconv.decode(html, 'ISO-8859-1');
    }
};

module.exports.getTitulaciones = function(){
    const options = {
        'uri': config.urls.cra_form,
        ...common_options
    };
    return rp(options).then(function(data){
        var $ = cheerio.load(data);
        var list = [];
        $('.listaG[name=tpp1]').children().each(function(i, elem){
            if(i != 0)
                list.push([elem.attribs.value, elem.firstChild.data.replace(/^\s*\S+\s*/, '')]);
        })
        return list;
    });
}

module.exports.getAsignaturas = function(t_code){
    const options = {
        'uri': config.urls.cra_form,
        'qs': {
            'tTit': t_code,
            'tAsig': '---'
        },
        ...common_options
    };
    return rp(options).then(function(data){
        var $ = cheerio.load(data);
        var list = [];
        $('.listaG[name=ttp2]').children().each(function(i, elem){
            if(i != 0)
                list.push([elem.attribs.value.match(/^\S+/)[0], elem.firstChild.data.replace(/^\s*\S+\s*/, '')]);
        })
        return list;
    });
}
