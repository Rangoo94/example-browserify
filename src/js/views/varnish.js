(function() {
    'use strict';

    var request = require('../modules/request'),
        VarnishLog = require('../modules/log/varnish');

    request.get('data/varnish.log').then(function(data) {
        var log = new VarnishLog(data);

        document.getElementById('varnish-log').appendChild(
            log.renderGrid({ column: 'remote', direction: 'asc' }, function(row) { return row.remote; })
        );
    }, function(err) {
        console.log('error!', err);
    });
}());
