(function() {
    'use strict';

    var ArticlesList = require('../../../src/js/modules/articles-list');

    function createItem(link, title, description) {
        return {
            link: link,
            title: title,
            description: description,
            pubdate: new Date('Thu, 26 Mar 2015 12:53:14 +0100')
        };
    }

    describe('ArticlesList', function() {
        it('should create list from specified articles', function() {
            var data = [
                createItem('#', 'Title', 'Description'),
                createItem('#', 'Title2'),
                createItem('#', 'Title3', 'Description'),
                createItem('#', 'Title4', 'Description'),
                createItem('#', 'Title5', 'Description')
            ], list = (new ArticlesList(data)).render();

            expect(list instanceof Element).toBeTruthy();
            expect(list.children.length).toEqual(5);
            expect(list.children[0].children.length).toEqual(2);
            expect(list.children[1].children.length).toEqual(1);
        });
    });
}());
