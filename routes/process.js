var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(request, response, next) {
    var input = request.body;
    console.log(input);

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
                continue;
            }

            if(!item.hasOwnProperty('slug')){
                continue;
            }

            if(!item.hasOwnProperty('title')){
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

    response.send(JSON.stringify(result));

    function isRequestValidated(req){
        var input = request.body;
        if(!input.hasOwnProperty('payload')) {
            console.log('Can not find payload!');
            return false;
        }

        if(!isArray(input['payload'])){
            console.log('Payload is not an array!');
            return false;
        }

        for (i = 0; i < input['payload'].length; i++) {
            var item=input['payload'][i];

            if (!item.hasOwnProperty('drm')) {
                continue;
            }
            if (!item.hasOwnProperty('episodeCount')) {
                continue;
            }

            if(item['drm']!==true || item['episodeCount']<=0){
                continue;
            }


        }
        return true;
    }

    function isArray(item){
        return Object.prototype.toString.call( item ) === '[object Array]';
    }
});

module.exports = router;
