var utils=require('./../js/common/utils');
var fieldNames=require('./../js/common/constants');

module.exports.isRequestValidated =function(requestBody){
    if(requestBody ===null){
        return false;
    }

    if(requestBody===undefined){
        return false;
    }

    var input = requestBody;
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
