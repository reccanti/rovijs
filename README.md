rovijs
==========
Simple node.js client for querying the rovi api. Based on [echonestjs by dinostheo](https://github.com/dinostheo/echonestjs)

## Installation
```
  npm install rovijs --save
```

## Usage

The rovijs module exposes a singleton object, which you can initialize once
with the api key, which is handy to use with application frameworks such as express.
```
  var Rovi = require('rovijs');

  Rovi.init('YOUR ROVI API KEY', 'YOUR ROVI API SECRET');

  Rovi.get('echonest/endpoint', {'the necessary parameters'}, callback);
```

e.g.

```
  var Rovi = require('rovijs');

  Rovi.init('abcdefghijklmnopqrstuvwx', 'abcdefghij');

  Rovi.get("name/videos", { "name": "Kanye West" }, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
  });
```

## Tests
To run the tests simply execute:
```
    npm test
```

The tests have a dependency of a configuration file config/config.js of the following structure:
```
/**
 * Module configuration.
 *
 * Contains the rovi api key and secret for the tests.
 *
 * config/config.js
 */
module.exports = {
    api_key: 'PLACE YOUR ROVI API KEY HERE',
    secret: 'PLACE YOUR ROVI SECRET HERE',
};
```

## Dependencies

[request](https://github.com/request/request)
