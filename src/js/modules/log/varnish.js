(function() {
    'use strict';

    var log = require('../log'),
        VarnishGrid = require('../varnish-grid'),
        COLS = [ 'remote', 'date', 'method', 'url', 'http', 'status', 'size', 'referer', 'userAgent' ],
        FORMAT = '^([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}) - - ' +
                 '\\[([^\\]]+)\\] "([^ ]+) ([^ ]+) ([^"]+)" ([0-9]+) ([0-9]+) "([^"]+)" "([^"]+)"';

    /**
     * Understands basic Varnish log syntax
     *
     * @param {String} data
     * @constructor
     */
    function VarnishLog(data) {
        this.data = log.parse(data, FORMAT, COLS);

        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = this.transform(this.data[i]);
        }
    }

    /**
     * Transform data in row to correct
     *
     * @param {Object} row
     * @returns {Object}
     */
    VarnishLog.prototype.transform = function(row) {
        row.date = new Date(row.date.replace(':', ' '));
        return row;
    };

    /**
     * Select specified number of element after sorting by specified function
     *
     * @param {Function} [sortFunc]
     * @param {Number} [limit]
     * @returns {Object[]}
     */
    VarnishLog.prototype.sort = function(sortFunc, limit) {
        this.data.sort(sortFunc);

        return this.data.slice(0, limit);
    };

    /**
     * Fire function for each row
     *
     * @param {Function} func
     */
    VarnishLog.prototype.forEach = function(func) {
        for (var i = 0; i < this.data.length; i++) {
            func(this.data[i], i, this.data);
        }
    };

    /**
     * Render grouped table
     *
     * @param {Object|Function} sort  Sorting function or object { column: String, direction: 'asc'|'desc' }
     * @param {Function} [group]
     * @param {Number} [limit]
     * @returns {Element}
     */
    VarnishLog.prototype.renderGrid = function(sort, group, limit) {
        var grid = new VarnishGrid(),
            sortRules;

        if (typeof sort === 'object') {
            sortRules = sort;

            sort = function(a, b) {
                if (a[sortRules.column] === b[sortRules.column]) {
                    return 0;
                } else if (sortRules.direction === 'desc') {
                    return a[sortRules.column] < b[sortRules.column] ? 1 : -1;
                } else {
                    return a[sortRules.column] < b[sortRules.column] ? -1 : 1;
                }
            };
        }

        grid.setGroupingFunction(group);

        return grid.render(this.sort(sort, limit));
    };

    module.exports = VarnishLog;
}());
