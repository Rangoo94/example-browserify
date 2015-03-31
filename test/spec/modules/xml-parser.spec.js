(function() {
    'use strict';

    // jshint unused: false
    var parseXML = require('../../../src/js/modules/xml-parser');

    var fs = require('fs');
    var xmlFile = fs.readFileSync(__dirname + '/../../examples/xml-1.xml', 'utf8'),
        xmlFile2 = fs.readFileSync(__dirname + '/../../examples/xml-2.xml', 'utf8');

    describe('XML Parser', function() {
        it('should parse XML file to JSON without definition', function() {
            var expectedResult = {
                xml: {
                    something: {
                        is: 'here'
                    },
                    anything: 'more',
                    item: 'A'
                }
            };

            expect(parseXML.fromString(xmlFile)).toEqual(expectedResult);
        });

        it('should parse XML file to JSON with definition', function() {
            var expectedResult = {
                xml: {
                    something: {
                        is: 'here'
                    },
                    anything: 'more',
                    item: [
                        { value: 'A' },
                        { value: 'B' },
                        { value: 'C' },
                        { value: 'D' }
                    ],
                    another: {
                        item: [
                            { value: 'E' },
                            { value: 'F' },
                            { value: 'G' }
                        ]
                    }
                }
            }, obj = parseXML.fromString(xmlFile2, {
                xml: {
                    item: {
                        '@type': 'array'
                    },
                    another: {
                        item: {
                            '@type': 'array'
                        }
                    }
                }
            });

            expect(obj).toEqual(expectedResult);
        });
    });
}());
