var assert = require("chai").assert;
var request = require('supertest');
var app = require("../app");

describe("test restful service", function() {
    describe("extract json with error handling", function() {

        it("wrong http method Get", function (done) {

            console.warn("request="+ request);
            request(app)
                .get("/")
                .type('json')
                .send({"payload":[]})
                .expect(400, {
                    "error": "Could not decode request:Service Not Found"
                }, done);
        });

        it("wrong url", function (done) {

            console.warn("request="+ request);
            request(app)
                .post("/wrongurl")
                .type('json')
                .send({"payload":[]})
                .expect(400, {
                    "error": "Could not decode request:Service Not Found"
                }, done);
        });

        it("wrong data -- no payload key", function (done) {

            console.warn("request="+ request);
            request(app)
                .post("/")
                .type('json')
                .send({"wrongkey":[]})
                .expect(400, {
                    "error": "Could not decode request: JSON parsing failed"
                }, done);
        });

        it("wrong data -- payload is not an array", function (done) {

            console.warn("request="+ request);
            request(app)
                .post("/")
                .type('json')
                .send({"payload":"not array"})
                .expect(400, {
                    "error": "Could not decode request: JSON parsing failed"
                }, done);
        });

        it("wrong data -- empty json", function (done) {

            console.warn("request="+ request);
            request(app)
                .post("/")
                .type('json')
                .send({})
                .expect(400, {
                    "error": "Could not decode request: JSON parsing failed"
                }, done);
        });

        it("wrong data -- not json", function (done) {

            console.warn("request="+ request);
            request(app)
                .post("/")
                .type('json')
                .send("<xml></xml>")
                .expect(400, {
                    "error": "Could not decode request:invalid json"
                }, done);
        });


        it("post with validate data -- empty array", function (done) {

            console.warn("request="+ request);
            request(app)
                .post("/")
                .type('json')
                .send({"payload":[]})
                .expect(200, {
                    "response": []
                }, done);
        });

        it("post with validate data -- not empty array", function (done) {

            console.warn("request="+ request);
            request(app)
                .post("/")
                .type('json')
                .send({"payload":[{
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
                    }]})
                .expect(200, {
                    "response": [{
                        "image": "http://catchup.ninemsn.com.au/img/jump-in/shows/16KidsandCounting1280.jpg",
                        "slug": "show/16kidsandcounting",
                        "title": "16 Kids and Counting"}]
                }, done);
        });




    });
});