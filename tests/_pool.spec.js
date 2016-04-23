/// <reference path="definitions/definitions.d.ts" />
"use strict";
var beril = require('src/beril');
describe('pool', function () {
    var entity, component, system, pool;
    describe('adding', function () {
        beforeEach(function () {
            pool = new beril.Pool();
            entity = new beril.Entity('test', [beril.Component]);
            pool.add(entity);
            system = new beril.System();
        });
        it('should add components', function () {
            expect(pool.components.basic).toBeDefined();
            expect(pool.components.basic.length).toBe(1);
        });
        it('should add pointer to pool to object', function () {
            expect(entity.pool).toBeDefined();
            expect(entity.pool).toEqual(pool);
        });
    });
    describe('removing', function () {
    });
    describe('subscription', function () {
        beforeEach(function () {
            system.subscribeToPool(pool);
        });
        it('should put a link to the pool in subscripted system', function () {
            expect(system.pool).toBeDefined();
        });
    });
});
