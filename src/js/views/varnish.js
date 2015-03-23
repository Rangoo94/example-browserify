(function() {
    'use strict';

    var request = require('../modules/request'),
        VarnishLog = require('../modules/log/varnish');

    request.get('data/varnish.log').then(function(data) {
        console.log('Success!', new VarnishLog(data));
    }, function(err) {
        console.log('error!', err);
    });
}());
