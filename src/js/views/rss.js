(function() {
    'use strict';

    var RSS = require('../modules/rss');

    RSS.fromURL('http://www.vg.no/rss/feed/forsiden/').then(function(feed) {
        console.log('Feed: ', feed);
    }, function(err) {
        console.log('Error:', err);
    });
}());
