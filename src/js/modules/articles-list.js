(function() {
    'use strict';

    /**
     * Class to generate articles list
     *
     * @param {Object[]} data
     * @constructor
     */
    function ArticlesList(data) {
        this.data = data;
    }

    /**
     * Render one item
     *
     * @param {Object} item
     * @returns {Element}
     */
    ArticlesList.prototype.renderItem = function(item) {
        var article = document.createElement('article'),
            title = document.createElement('h3'),
            link = document.createElement('a'),
            date = document.createElement('span'),
            description;

        date.innerText = item.pubdate.toString();

        title.innerText = item.title;
        title.appendChild(date);

        link.setAttribute('href', item.link);
        link.setAttribute('target', '_blank');
        link.appendChild(title);

        article.appendChild(link);

        if (item.description) {
            description = document.createElement('div');
            description.className = 'description';
            description.innerText = item.description;

            article.appendChild(description);
        }

        return article;
    };

    /**
     * Render list of items
     *
     * @returns {Element}
     */
    ArticlesList.prototype.render = function() {
        var element = document.createElement('section');

        for (var i = 0; i < this.data.length; i++) {
            element.appendChild(this.renderItem(this.data[i]));
        }

        return element;
    };

    module.exports = ArticlesList;
}());
