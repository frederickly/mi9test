var express = require('express');
var validator=require('./validate');
var extractor=require('./extract');

var router = express.Router();

/* json restful service . */
router.post('/', function(request, response, next) {
    var requestBody = request.body;
    console.log('request=%s', JSON.stringify(requestBody));

    if(!validator.isRequestValidated(requestBody)) {
        var errorMsg={};
        errorMsg['error']="Could not decode request: JSON parsing failed";
        console.log('response=%s', JSON.stringify(errorMsg));
        response.status(400).json(errorMsg);
    }

    var result= extractor.extract(requestBody);

    console.log('response=%s', JSON.stringify(result));
    response.json(result);


});

module.exports = router;
