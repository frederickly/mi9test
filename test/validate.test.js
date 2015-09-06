var expect    = require("chai").expect;
var validator = require("../routes/validate");

describe("json data processor", function() {

    describe("check if request is valid", function() {
        it("check multi requests here", function() {

            expect(validator.isRequestValidated(null)).to.equal(false);
            expect(validator.isRequestValidated(undefined)).to.equal(false);
            expect(validator.isRequestValidated({})).to.equal(false);
            expect(validator.isRequestValidated("<xml></xml>")).to.equal(false);
            expect(validator.isRequestValidated({"any":"any"})).to.equal(false);
            expect(validator.isRequestValidated({"payload":"any"})).to.equal(false);
            expect(validator.isRequestValidated({"payload":[]})).to.equal(true);
            expect(validator.isRequestValidated({"payload":[{
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
                }]})).to.equal(true);
        });
    });



});