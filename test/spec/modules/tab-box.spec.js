(function() {
    'use strict';

    var TabBox = require('../../../src/js/modules/tab-box');

    function prepareBox() {
        var el = document.createElement('div'),
            nav = document.createElement('nav');

        el.appendChild(nav);

        return el;
    }

    describe('TabBox', function() {
        it('should initialize new TabBox', function() {
            expect(TabBox.create(prepareBox()) instanceof TabBox).toBeTruthy();
        });
    });
}());