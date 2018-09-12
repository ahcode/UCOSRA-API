const app = require("express")();
const bodyParser = require("body-parser");
const config = require("./config.json");
const router = require("./router.js").router;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

if(config.hasOwnProperty('https') && config.https == true){
    const privateKey  = fs.readFileSync(config.SSL_KEY_FILE, 'utf8');
    const certificate = fs.readFileSync(config.SSL_CRT_FILE, 'utf8');
    const credentials = {key: privateKey, cert: certificate};
    var server = require("https").createServer(credentials, app);
}else{
    var server = require("http").createServer(app);
}

server.listen(config.port, function() {
    console.log("UCOSRA-API Running...");
});