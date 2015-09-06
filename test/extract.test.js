var expect    = require("chai").expect;
var extractor = require("../routes/extract");

describe("json data extractor", function() {

    describe("extract response from request", function() {
        it("extra multi requests here", function() {

            expect(extractor.extract({"payload":[]})).to.have.a.property("response").be.empty;
            expect(extractor.extract({"payload":[{
                "country": "UK",
                "description": "What's life like when you have enough children to field your own football team?",
                "drm": true,
                "episodeCount": 3,
                "genre": "Reality",
                "image": {
                    "showImage": "http://catchup.ninemsn.com.au/img/jump-in/shows/16KidsandCounting1280.jpg"
                },
                "language": "English",
                "nextEpisode": null,
                "primaryColour": "#ff7800",
                "seasons": [
                    {
                        "slug": "show/16kidsandcounting/season/1"
                    }
                ],
                "slug": "show/16kidsandcounting",
                "title": "16 Kids and Counting",
                "tvChannel": "GEM"
            },
                {
                    "slug": "show/seapatrol",
                    "title": "Sea Patrol",
                    "tvChannel": "Channel 9"
                }]})).to.have.a.property("response").to.deep.equal([{
                    "image": "http://catchup.ninemsn.com.au/img/jump-in/shows/16KidsandCounting1280.jpg",
                    "slug": "show/16kidsandcounting",
                    "title": "16 Kids and Counting"}]);

            //add more test cases here

        });
    });

});