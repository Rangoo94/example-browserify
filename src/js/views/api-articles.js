(function() {
    'use strict';

    var request = require('../modules/request'),
        ArticlesList = require('../modules/articles-list');

    /**
     * Retrieve articles from JSONP
     */
    request.jsonp('http://rexxars.com/playground/testfeed/', 'callback').then(function(items) {
        var list,
            el;

        for (var i = 0; i < items.length; i++) {
            items[i].pubdate = new Date(items[i].date + ' ' + items[i].time);
        }

        items.sort(function(a, b) {
            return a.pubdate < b.pubdate ? 1 : -1;
        });

        list = new ArticlesList(items);

        el = list.render();
        el.className = 'articles';

        document.getElementById('api-articles').appendChild(el);
    }, function(err) {
        console.log('Error:', err);
    });
}());
