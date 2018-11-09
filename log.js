//Simple log function. Will be improved in future versions.
const textlog = function(text){
    var d = new Date;
    console.log(text + ' - ' + d);
}

module.exports.textlog = textlog;