(function() {
    'use strict';

    var RSS = require('../modules/rss'),
        Loader = require('../modules/loader'),
        ArticlesList = require('../modules/articles-list'),
        articlesEl = document.getElementById('rss-articles');

    Loader.create(articlesEl, function(done, error) {
        // Retrieve articles from RSS
        RSS.fromURL('http://www.vg.no/rss/feed/forsiden/').then(function(feed) {
            var items = feed.getItems(),
                list,
                el;

            items.sort(function(a, b) {
                return a.pubdate < b.pubdate ? 1 : -1;
            });

            list = new ArticlesList(items);

            el = list.render();
            el.className = 'articles';

            done();
            articlesEl.appendChild(el);
        }, function() {
            error('Error occurred while loading articles from RSS');
        });
    });
}());
