(function() {
    'use strict';

    var request = require('../modules/request'),
        Loader = require('../modules/loader'),
        ArticlesList = require('../modules/articles-list'),
        articlesEl = document.getElementById('api-articles');

    Loader.create(articlesEl, function(done, error) {
        // Retrieve articles from JSONP
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

            done();
            articlesEl.appendChild(el);
        }, function() {
            error('Error occurred while loading articles from API');
        });
    });
}());
