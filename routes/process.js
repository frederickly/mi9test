var express = require('express');
var utils=require('./../js/common/utils');
var fieldNames=require('./../js/common/constants');

var router = express.Router();

/* GET users listing. */
router.post('/', function(request, response, next) {
    var input = request.body;
    console.log('request=%s', JSON.stringify(input));

    if(!isRequestValidated()) {
        var errorMsg={};
        errorMsg['error']="Could not decode request: JSON parsing failed";
        var body=JSON.stringify(errorMsg);
        console.log('response=%s', body);
        response.status(400).json(errorMsg);
    }

    var result={'response':[]};
    for (i = 0; i < input[fieldNames.PAYLOAD].length; i++) {
        var item=input[fieldNames.PAYLOAD][i];

        if(!item.hasOwnProperty(fieldNames.DRM)){
            continue;
        }
        if(!item.hasOwnProperty(fieldNames.EPISODECOUNT)){
            continue;
        }

        if(item[fieldNames.DRM]===true && item[fieldNames.EPISODECOUNT]>0){

            var targetItem={};

            if(!item.hasOwnProperty(fieldNames.IMAGE)){
                console.warn('payload element does hot have property image');
                continue;
            }

            if(!item.hasOwnProperty(fieldNames.SLUG)){
                console.warn('payload element does hot have property slug');
                continue;
            }

            if(!item.hasOwnProperty(fieldNames.TITLE)){
                console.warn('payload element does hot have property title');
                continue;
            }


            var image=item[fieldNames.IMAGE];
            if(!image.hasOwnProperty(fieldNames.SHOWIMAGE)){
                continue;
            }


            targetItem[fieldNames.IMAGE]=item[fieldNames.IMAGE][fieldNames.SHOWIMAGE];
            targetItem[fieldNames.SLUG]=item[fieldNames.SLUG];
            targetItem[fieldNames.TITLE]=item[fieldNames.TITLE];
            result[fieldNames.RESPONSE].push(targetItem);
        }


    }

    var body=JSON.stringify(result);
    console.log('response=%s', body);
    response.json(result);

    function isRequestValidated(){
        var input = request.body;
        if(!input.hasOwnProperty(fieldNames.PAYLOAD)) {
            console.warn('Can not find payload!');
            return false;
        }

        if(!utils.isArray(input[fieldNames.PAYLOAD])){
            console.warn('Payload is not an array!');
            return false;
        }

        for (i = 0; i < input[fieldNames.PAYLOAD].length; i++) {
            var item=input[fieldNames.PAYLOAD][i];

            if (!item.hasOwnProperty(fieldNames.DRM)) {
                console.warn('payload element does hot have property drm');
                //continue;
            }
            if (!item.hasOwnProperty(fieldNames.EPISODECOUNT)) {
                console.warn('payload element does hot have property episodeCount');
                //continue;
            }
        }
        return true;
    }

});

module.exports = router;
