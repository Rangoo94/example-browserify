(function() {
    'use strict';

    var request = require('../modules/request'),
        VarnishLog = require('../modules/log/varnish');

    function buildList(items, buildItem) {
        var listEl = document.createElement('ul'),
            el;

        listEl.className = 'list';

        for (var i = 0; i < items.length; i++) {
            el = document.createElement('li');
            buildItem(el, items[i]);
            listEl.appendChild(el);
        }

        return listEl;
    }

    request.get('data/varnish.log').then(function(data) {
        var log = new VarnishLog(data),
            list;

        // Prepare list of hostnames with most traffic
        list = log.findHostnamesWithMostTraffic(5);
        document.getElementById('varnish-most-traffic').appendChild(
            buildList(list, function(el, item) {
                var traffic = document.createElement('span');
                traffic.innerText = item.traffic + ' bytes';

                el.innerText = item.url;
                el.appendChild(traffic);
            })
        );

        // Prepare list of most requested files
        list = log.findMostRequestedFiles(5);
        document.getElementById('varnish-most-requested').appendChild(
            buildList(list, function(el, item) {
                var requests = document.createElement('span');
                requests.innerText = item.requests + ' requests';

                el.innerText = item.url;
                el.appendChild(requests);
            })
        );

        // Prepare full log
        document.getElementById('varnish-log').appendChild(
            log.renderGrid({ column: 'remote', direction: 'asc' }, function(row) { return row.remote; })
        );
    }, function(err) {
        console.log('error!', err);
    });
}());
