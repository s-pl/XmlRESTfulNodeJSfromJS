//Help found in following links:
//https://github.com/libxmljs/libxmljs/wiki
//https://www.npmjs.com/package/xsd-schema-validator
//https://github.com/remind101/express-xml-bodyparser

//library xsd-schema-validator needs JAVA. 
//Tested working with:
//$ echo $JAVA_HOME
//C:\Program Files\Java\jdk1.8.0_202

var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    xmlparser = require('express-xml-bodyparser');

var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

var cors = require('cors');
app.use(cors());

// .. other middleware ... 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(xmlparser());
// ... other middleware ... 

var validator = require('xsd-schema-validator');
var schemaPath = "xsd/monuments.xsd";

// libxmljs not working anymore
// var libxmljs = require("libxmljs");

//In a more real case this information would be stored in a DB
var monuments = '<?xml version="1.0" encoding="UTF-8"?><Monuments></Monuments>';

app.get('/monuments', function (req, res, next) {
    res.set('application/xml').send(monuments);
});

app.post('/monuments', function (req, res, next) {
    // req.body contains the parsed xml
    var reqRawBody = req.rawBody;
    
    validator.validateXML(reqRawBody, schemaPath, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            res.set('application/xml').send(`<response>Error</response>`);
            return;
        }

        var xmlReqRawBody = new DOMParser().parseFromString(reqRawBody, 'application/xml');
        var xmlmonuments = new DOMParser().parseFromString(monuments);

        xmlmonumentToAdd = xmlReqRawBody.getElementsByTagName("Monument")[0];
        xmlmonuments.getElementsByTagName("Monuments")[0].appendChild(xmlmonumentToAdd);

        monuments = new XMLSerializer().serializeToString(xmlmonuments);

        res.set('application/xml').send(`<response>Added!</response>`);
    });
});

server.listen(1337, () => {
    console.log(`Example Server using package xsd-schema-validator listening on port 1337`);
});