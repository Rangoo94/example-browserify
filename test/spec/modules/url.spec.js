(function() {
    'use strict';

    var url = require('../../../src/js/modules/url');

    describe('URL', function() {
        it('should retrieve hostname from URL', function() {
            var data = {
                'http://www.google.pl': 'www.google.pl',
                'http://www.goog.pl/something-is-there-also': 'www.goog.pl',
                'http://goog.pl/something-is-there-also': 'goog.pl',
                'http://usr@goog.pl/something-is-there-also': 'goog.pl',
                'ftp://usr@goog.pl/something-is-there-also': 'goog.pl'
            };

            for (var idx in data) {
                expect(url.getHostname(idx)).toEqual(data[idx]);
            }
        });
    });
}());
