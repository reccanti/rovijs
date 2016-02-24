/**
 * DEPENDENCIES
 */
var request = require('request'),
    qs = require('querystring'),
    md5 = require('md5'),
    fs = require('fs'),
    util = require('util');

var Rovi = new Function();

Rovi.prototype = {

    /**
     * Initializes the rovi module and sets the api key.
     *
     * @param {String} key The echonest developer API KEY
     */
    init: function (key, secret) {
        this.api_key = key;
        this.secret = secret;
    },

    /**
     * GET request to the specified rovi endpoint.
     *
     * @param  {String}   endpoint The specified echonest endpoint to GET
     * @param  {Object}   params   An object that contains the GET query parameters.
     * @param  {Function} done     Callback function that takes err and result as parameters.
     */
    get: function (endpoint, params, done) {
        
        if ( (!this.api_key || !this.api_key.trim()) ||
             (!this.secret || !this.secret.trim()) ) {
            return done({
                message: 'API KEY is not set.'
            });
        }
        var signature = genSig(this.api_key, this.secret);
        
        var base_url = 'http://api.rovicorp.com',
            endpointPath = '/data/v1.1/' + endpoint + '?',
            params = params ? qs.stringify(params) : '',
            closingPath = '&count=0' +
                          '&offset=0' +
                          '&country=US' +
                          '&language=en' +
                          '&format=json' + 
                          '&apikey=' + this.api_key + 
                          '&sig=' + signature;

        var queryString = base_url + endpointPath + params + closingPath;
        
        request(queryString, function (err, response, body) {
            if (err || response.statusCode !== 200) {
                return done(err || body);
            }
            done(null, JSON.parse(body));
        });
        
    }
}

/**
 * A utility function for generating an md5 signature for
 * use in the Rovi API.
 */
function genSig(apikey, secret) {
    var curdate = new Date();
    var gmtstring = curdate.toGMTString();
    var utc = Date.parse(gmtstring) / 1000;
    return  md5(apikey + secret + utc);
}

module.exports = new Rovi();
