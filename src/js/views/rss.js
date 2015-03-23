(function() {
    'use strict';

    var RSS = require('../modules/rss'),
        ArticlesList = require('../modules/articles-list');

    /**
     * Retrieve articles from RSS
     */
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

        document.getElementById('rss-articles').appendChild(el);
    }, function(err) {
        console.log('Error:', err);
    });
}());
