(function() {
    'use strict';

    var log = require('../log'),
        FORMAT = '^([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}) - - \\[([^\\]]+)\\] "([^ ]+) ([^ ]+) ([^"]+)" ([0-9]+) ([0-9]+) "([^"]+)" "([^"]+)"',
        COLS = [ 'ip', 'date', 'method', 'url', 'http', 'status', 'size', 'referer', 'userAgent' ];

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
     * @param {Object} row
     * @returns {Object}
     */
    VarnishLog.prototype.transform = function(row) {
        row.date = Date.parse(row.date.replace(':', ' '));
        return row;
    };

    module.exports = VarnishLog;
}());
