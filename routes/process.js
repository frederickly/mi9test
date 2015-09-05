var express = require('express');
var utils=require('./../js/common/utils');
var router = express.Router();

/* GET users listing. */
router.post('/', function(request, response, next) {
    var input = request.body;
    console.log('request=%s', JSON.stringify(input));

    if(!isRequestValidated(request)) {
        response.status(400).send({"error": "Could not decode request: JSON parsing failed"});
    }

    var result={'response':[]};
    for (i = 0; i < input['payload'].length; i++) {
        var item=input['payload'][i];

        if(!item.hasOwnProperty('drm')){
            continue;
        }
        if(!item.hasOwnProperty('episodeCount')){
            continue;
        }

        if(item['drm']===true && item['episodeCount']>0){

            var targetItem={};

            if(!item.hasOwnProperty('image')){
                console.warn('payload element does hot have property image');
                continue;
            }

            if(!item.hasOwnProperty('slug')){
                console.warn('payload element does hot have property slug');
                continue;
            }

            if(!item.hasOwnProperty('title')){
                console.warn('payload element does hot have property title');
                continue;
            }

            var image=item['image'];

            if(!image.hasOwnProperty('showImage')){
                continue;
            }

            targetItem['image']=item['image']['showImage'];
            targetItem['slug']=item['slug'];
            targetItem['title']=item['title'];
            result['response'].push(targetItem);
        }


    }

    var body=JSON.stringify(result);
    console.log('response=%s', body);
    response.send(body);

    function isRequestValidated(req){
        var input = request.body;
        if(!input.hasOwnProperty('payload')) {
            console.log('Can not find payload!');
            return false;
        }

        if(!utils.isArray(input['payload'])){
            console.log('Payload is not an array!');
            return false;
        }

        for (i = 0; i < input['payload'].length; i++) {
            var item=input['payload'][i];

            if (!item.hasOwnProperty('drm')) {
                console.warn('payload element does hot have property drm');
                //continue;
            }
            if (!item.hasOwnProperty('episodeCount')) {
                console.warn('payload element does hot have property episodeCount');
                //continue;
            }
        }
        return true;
    }

});

module.exports = router;
