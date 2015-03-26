(function() {
    'use strict';

    var Loader = require('../../../src/js/modules/loader'),
        ERROR_MESSAGE = 'error message';

    describe('Loader', function() {
        it('should create instance of loader', function() {
            var parentNode = document.createElement('div');
            expect((new Loader(parentNode)) instanceof Loader).toBeTruthy();
        });

        it('should show loader (not immediately)', function() {
            var parentNode = document.createElement('div'),
                loader = new Loader(parentNode);

            expect(parentNode.children.length).toEqual(0);

            loader.show();

            expect(parentNode.children.length).toEqual(1);
            expect(parentNode.children[0]).toBe(loader.element);
        });

        it('should show loader (immediately)', function() {
            var parentNode = document.createElement('div'),
                loader = new Loader(parentNode, true);

            expect(parentNode.children.length).toEqual(1);
            expect(parentNode.children[0]).toBe(loader.element);
        });

        it('should hide loader', function() {
            var parentNode = document.createElement('div'),
                loader = new Loader(parentNode, true);

            loader.hide();

            expect(parentNode.children.length).toEqual(0);
        });

        it('should show error message in this loader', function() {
            var parentNode = document.createElement('div'),
                loader = new Loader(parentNode, true);

            loader.setErrorMessage(ERROR_MESSAGE);

            expect(loader.element.innerHTML).toEqual(ERROR_MESSAGE);
        });

        it('should create loader with callback (success)', function() {
            var parentNode = document.createElement('div'),
                called = false,
                loader;

            loader = Loader.create(parentNode, function(ok) {
                called = true;

                expect(parentNode.children.length).toEqual(1);
                expect(parentNode.children[0]).toBe(this.element);

                ok();
            });

            expect(parentNode.children.length).toBe(0);
            expect(called).toBeTruthy();
        });

        it('should create loader with callback (error)', function() {
            var parentNode = document.createElement('div'),
                called = false,
                loader;

            loader = Loader.create(parentNode, function(ok, fail) {
                called = true;

                expect(parentNode.children.length).toEqual(1);
                expect(parentNode.children[0]).toBe(this.element);

                fail(ERROR_MESSAGE);
            });

            expect(parentNode.children.length).toEqual(1);
            expect(parentNode.children[0]).toBe(loader.element);
            expect(parentNode.children[0].innerHTML).toEqual(ERROR_MESSAGE);
            expect(called).toBeTruthy();
        });
    });
}());
