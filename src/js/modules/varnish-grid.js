(function() {
    'use strict';

    var shortenText,
        COLUMNS;

    /**
     * Generate function which truncate text to specified length
     *
     * @param {Number} len
     * @returns {Function}
     */
    shortenText = function(len) {
        len = len || 50;

        return function(txt, cell) {
            cell.title = txt;

            return txt.length > len ? txt.substr(0, len) + '...' : txt;
        }
    };

    COLUMNS = [
        { column: 'remote', label: 'Remote host' },
        { column: 'date', label: 'Date', transform: function(date) { return date.toString(); } },
        { column: 'method', label: 'Method' },
        { column: 'url', label: 'URL', transform: shortenText(40) },
        { column: 'status', label: 'Status' },
        { column: 'size', label: 'Size' },
        { column: 'referer', label: 'Referer', transform: shortenText(40) },
        { column: 'userAgent', label: 'User agent', transform: shortenText(40) }
    ];

    /**
     * Class to generate grid view
     *
     * @param {Function} [group]  Grouping functions
     * @constructor
     */
    function VarnishGrid(group) {
        this.group = group;
    }

    /**
     * Set current grouping function
     *
     * @param {Function} [func]
     */
    VarnishGrid.prototype.setGroupingFunction = function(func) {
        this.group = func;
    };

    /**
     * Create header element
     *
     * @returns {Element}
     */
    VarnishGrid.prototype.createHeader = function() {
        var header = document.createElement('thead'),
            rowEl = document.createElement('tr'),
            cell;

        for (var i = 0; i < COLUMNS.length; i++) {
            cell = document.createElement('th');
            cell.innerText = COLUMNS[i].label;
            rowEl.appendChild(cell);
        }

        header.appendChild(rowEl);

        return header;
    };

    /**
     * Create group row
     *
     * @param {String} group
     * @returns {Element}
     */
    VarnishGrid.prototype.createGroupRow = function(group) {
        var row = document.createElement('tr'),
            cell = document.createElement('td');

        cell.setAttribute('colspan', COLUMNS.length);
        cell.innerText = group;

        row.className = 'group';
        row.appendChild(cell);

        return row;
    };

    /**
     * Create entry row
     *
     * @param {Object} row
     * @returns {Element}
     */
    VarnishGrid.prototype.createRow = function(row) {
        var rowEl = document.createElement('tr'),
            cell;

        for (var i = 0; i < COLUMNS.length; i++) {
            cell = document.createElement('td');
            cell.innerText = COLUMNS[i].transform ? COLUMNS[i].transform(row[COLUMNS[i].column], cell) : row[COLUMNS[i].column];
            rowEl.appendChild(cell);
        }

        return rowEl;
    };

    /**
     * Render grid table
     *
     * @param {Object} data
     * @returns {Element}
     */
    VarnishGrid.prototype.render = function(data) {
        var table = document.createElement('table'),
            tbody = document.createElement('tbody'),
            currentGroup = null,
            group;

        table.className = 'grid';

        table.appendChild(this.createHeader());

        table.appendChild(tbody);

        for (var rowIdx = 0; rowIdx < data.length; rowIdx++) {
            if (this.group) {
                group = this.group(data[rowIdx], data, rowIdx);

                if (group !== currentGroup) {
                    currentGroup = group;
                    tbody.appendChild(this.createGroupRow(group));
                }
            }

            tbody.appendChild(this.createRow(data[rowIdx]));
        }

        return table;
    };

    module.exports = VarnishGrid;
}());
