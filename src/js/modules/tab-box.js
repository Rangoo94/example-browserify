(function() {
    'use strict';

    /**
     * Component to add behavior for box with tabs
     *
     * @param {Element} el
     * @constructor
     */
    function TabBox(el) {
        this.el = el;
        this.navigation = this.el.querySelector('nav');
        this.tabs = this.el.querySelector('.box-inner');

        this.initializeNavigation();
    }

    /**
     * Show specified tab
     *
     * @param {String} id
     */
    TabBox.prototype.show = function(id) {
        this.selectNav(id);
        this.selectTab(id);
    };

    /**
     * Select current tab as visible
     *
     * @param {String} id
     */
    TabBox.prototype.selectTab = function(id) {
        var tabs = this.tabs.querySelectorAll('.tab'); // @fixme: it disallow creating tabs box withing another one

        // Select current tab as visible
        for (var idx = 0; idx < tabs.length; idx++) {
            if (tabs[idx].className.match(/\bcurrent\b/)) {
                tabs[idx].className = tabs[idx].className.replace(/\bcurrent\b/, '');
            }

            if (tabs[idx].id === id) {
                tabs[idx].className += ' current';
            }
        }
    };

    /**
     * Select current tab in navigation
     *
     * @param {String} id
     */
    TabBox.prototype.selectNav = function(id) {
        var links = this.navigation.querySelectorAll('li');

        for (var idx = 0; idx < links.length; idx++) {
            if (links[idx].className.match(/\bcurrent\b/)) {
                links[idx].className = links[idx].className.replace(/\bcurrent\b/, '');
            }

            if (links[idx].getAttribute('data-target') === id) {
                links[idx].className += ' current';
            }
        }
    };

    /**
     * Initialize navigation behavior
     */
    TabBox.prototype.initializeNavigation = function() {
        var self = this;

        this.navigation.addEventListener('click', function(e) {
            var li = e.target.parentNode;

            if (li.hasAttribute('data-target')) {
                e.preventDefault();
                e.stopPropagation();

                self.show(li.getAttribute('data-target'));
            }
        });
    };

    /**
     * Alias for creating new TabBox
     *
     * @param {Element} el
     * @returns {TabBox}
     */
    TabBox.create = function(el) {
        return new TabBox(el);
    };

    module.exports = TabBox;
}());
