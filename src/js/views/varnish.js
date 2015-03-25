(function() {
    'use strict';

    var request = require('../modules/request'),
        Loader = require('../modules/loader'),
        VarnishLog = require('../modules/log/varnish'),

        mostTrafficEl = document.getElementById('varnish-most-traffic'),
        mostRequestedEl = document.getElementById('varnish-most-requested'),
        logEl = document.getElementById('varnish-log'),

        mostTrafficLoader = new Loader(mostTrafficEl, true),
        mostRequestedLoader = new Loader(mostRequestedEl, true),
        logLoader = new Loader(logEl, true);

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
        mostTrafficLoader.hide();
        mostTrafficEl.appendChild(
            buildList(list, function(el, item) {
                var traffic = document.createElement('span');
                traffic.innerText = item.traffic + ' bytes';

                el.innerText = item.url;
                el.appendChild(traffic);
            })
        );

        // Prepare list of most requested files
        list = log.findMostRequestedFiles(5);
        mostRequestedLoader.hide();
        mostRequestedEl.appendChild(
            buildList(list, function(el, item) {
                var requests = document.createElement('span');
                requests.innerText = item.requests + ' requests';

                el.innerText = item.url;
                el.appendChild(requests);
            })
        );

        // Prepare full log
        logLoader.hide();
        logEl.appendChild(
            log.renderGrid({
                column: 'remote',
                direction: 'asc'
            }, function(row) {
                return row.remote;
            })
        );
    }, function() {
        mostTrafficLoader.setErrorMessage('Error occurred while loading Varnish log');
        mostRequestedLoader.setErrorMessage('Error occurred while loading Varnish log');
        logLoader.setErrorMessage('Error occurred while loading Varnish log');
    });
}());
