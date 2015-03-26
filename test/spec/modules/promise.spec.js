(function() {
    'use strict';

    // jshint unused: false
    var Promise = require('../../../src/js/modules/promise');

    describe('Promise', function() {
        it('should resolve promise with tasks which are defined before', function() {
            var promise = new Promise(),
                deferred = false;

            promise.then(function() {
                deferred = true;
            });

            promise.resolve();

            expect(deferred).toBeTruthy();
        });

        it('should start tasks which are defined after resolving', function() {
            var promise = new Promise(),
                deferred = false;

            promise.resolve();

            promise.then(function() {
                deferred = true;
            });

            expect(deferred).toBeTruthy();
        });

        it('should reject promise with tasks which are defined before', function() {
            var promise = new Promise(),
                rejected = false;

            promise.then(null, function() {
                rejected = true;
            });

            promise.reject();

            expect(rejected).toBeTruthy();
        });

        it('should start fail tasks which are defined after rejecting', function() {
            var promise = new Promise(),
                rejected = false;

            promise.reject();

            promise.then(null, function() {
                rejected = true;
            });

            expect(rejected).toBeTruthy();
        });

        it('shouldn\'t run callbacks twice when started twice', function() {
            var promise = new Promise(),
                resolved = 0;

            promise.resolve();

            promise.then(function() {
                resolved++;
                promise.run();
            });

            expect(resolved).toEqual(1);
        });
    });
}());
