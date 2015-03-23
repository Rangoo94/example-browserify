(function() {
    'use strict';

    // Dispatch all boxes with tabs
    require('./views/tab-boxes');

    // Dispatch Varnish tab
    require('./views/varnish');

    // Dispatch RSS tab
    require('./views/rss');

    // Dispatch API articles tab
    require('./views/api-articles');
}());
