const errors = require('./errors.json');
const config = require('./config.json');

//Return error response.
const error = function(code){
    var json_resp = {};

    if(code[0] == 'U' || config.debug){
        //Respond with code and message if exists
        json_resp.error = code;
        if(errors.hasOwnProperty(code))
            json_resp.msg = errors[code];
    }else{
        //Not show server errors to client when debug is off
        json_resp.error = 'SE';
        json_resp.msg = 'Server Error';
    }

    //Server Error Log
    if(code[0] == 'S'){
        var message = 'SERVER ERROR ' + code;
        if(errors.hasOwnProperty(code))
            message += ' - ' + errors[code];
        log(message);
    }

    return json_resp;
}

//Simple log function. Will be improved in future versions.
const log = function(text){
    var d = new Date;
    console.log(text + ' - ' + d);
}

module.exports.error = error;
module.exports.log = log;