var Rovi = require("../");
var config = require('../config/config');

Rovi.init(config.api_key, config.secret);

Rovi.get("name/influencers", { "name": "The Killers" }, function (err, res) {
   console.log(res);
   console.log(err); 
});