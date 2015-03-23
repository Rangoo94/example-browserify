(function() {
    'use strict';

    /**
     * Very simple implementation of promises
     *
     * @constructor
     */
    function Promise() {
        this.successCallbacks = [];
        this.failCallbacks = [];
        this.isFinished = false;
        this.isSuccess = false;
        this.isRunning = false;
        this.result = null;
    }

    /**
     * Add new behavior after promise is finished
     *
     * @param {Function} success
     * @param {Function} fail
     */
    Promise.prototype.then = function(success, fail) {
        this.successCallbacks.push(success);
        this.failCallbacks.push(fail);

        if (this.isFinished) {
            this.run();
        }
    };

    /**
     * Run proper callbacks
     */
    Promise.prototype.run = function() {
        var callbacks;

        if (this.isRunning) {
            return;
        }

        this.isRunning = true;

        if (this.isSuccess) {
            callbacks = this.successCallbacks;
        } else {
            callbacks = this.failCallbacks;
        }

        while (callbacks.length) {
            callbacks.shift()(this.result);
        }

        this.isRunning = false;
    };

    /**
     * Finish current promise
     *
     * @param {Boolean} success
     * @param {*} result
     */
    Promise.prototype.finish = function(success, result) {
        this.isFinished = true;
        this.isSuccess = success;
        this.result = result;

        this.run();
    };

    /**
     * Resolve current promise
     *
     * @param {*} [data]
     */
    Promise.prototype.resolve = function(data) {
        this.finish(true, data);
    };

    /**
     * Reject current promise
     *
     * @param {*} [reason]
     */
    Promise.prototype.reject = function(reason) {
        this.finish(false, reason);
    };

    module.exports = Promise;
}());
