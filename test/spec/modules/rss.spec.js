(function() {
    'use strict';

    var RSS = require('../../../src/js/modules/rss');

    var fs = require('fs');
    var rssFile = fs.readFileSync(__dirname + '/../../examples/rss-1.xml', 'utf8');

    describe('RSS', function() {
        it('should create instance of RSS', function() {
            expect((new RSS(rssFile)) instanceof RSS).toBeTruthy();
        });

        it('should find items and transform them correctly', function() {
            var rss = new RSS(rssFile),
                items = rss.getItems();

            expect(items.length).toEqual(10);

            expect(items[0].pubdate instanceof Date).toBeTruthy();
        });

        it('should return basic variables from RSS', function() {
            var rss = new RSS(rssFile);

            expect(rss.get('title')).toEqual('VG RSS');
            expect(rss.get('lastbuilddate') instanceof Date).toBeTruthy();
            expect(rss.get('ttl')).toEqual(10);
        });
    });
}());
