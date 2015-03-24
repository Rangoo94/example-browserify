(function() {
    'use strict';

    /**
     * Loader view which will be attached to specified element
     *
     * @param {Element} parentNode
     * @param {Boolean} [show]  Should show loader after creating?
     * @constructor
     */
    function Loader(parentNode, show) {
        this.parentNode = parentNode;
        this.element = this.createElement();

        if (show) {
            this.show();
        }
    }

    /**
     * Create DOM element of loader
     */
    Loader.prototype.createElement = function() {
        var element = document.createElement('div');

        element.className = 'loader';
        element.innerHTML = 'Loading...';

        return element;
    };

    /**
     * Add loader to parent element
     */
    Loader.prototype.show = function() {
        this.parentNode.appendChild(this.element);
    };

    /**
     * Remove loader from parent element
     */
    Loader.prototype.hide = function() {
        this.parentNode.removeChild(this.element);
    };

    /**
     * Create loader which is removed after callback is fired
     *
     * @param {Element} parentNode
     * @param {Function} func
     * @returns {Loader}
     */
    Loader.create = function(parentNode, func) {
        var loader = new Loader(parentNode, true);

        func(function() {
            loader.hide();
        });

        return loader;
    };

    module.exports = Loader;
}());
