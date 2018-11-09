const errors = require('./errors.json');
const log = require('./log.js');

//Return error response
const error = function(code){
    var json_resp = {};

    //Build response
    json_resp.error = code;
    if(errors.hasOwnProperty(code))
        json_resp.msg = errors[code];

    //Server Error Log
    if(code.startsWith('Ss')){
        var message = 'SERVER ERROR ' + code;
        if(errors.hasOwnProperty(code))
            message += ' - ' + errors[code];
        log.textlog(message);
    }

    return json_resp;
}

module.exports.error = error;