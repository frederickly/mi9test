var fieldNames=require('./../js/common/constants');

module.exports.extract =function(requestBody){

    var input = requestBody;
    var result={'response':[]};
    for (var i = 0; i < input[fieldNames.PAYLOAD].length; i++) {
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

    return result;

}
