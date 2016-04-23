/// <reference path="definitions/definitions.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var beril = require('src/beril');
var Lol = (function (_super) {
    __extends(Lol, _super);
    function Lol() {
        _super.apply(this, arguments);
    }
    return Lol;
}(beril.System));
var Blah = (function (_super) {
    __extends(Blah, _super);
    function Blah() {
        _super.apply(this, arguments);
        this.deps = [Lol];
    }
    return Blah;
}(beril.System));
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        _super.apply(this, arguments);
    }
    return Foo;
}(beril.System));
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    return Bar;
}(beril.System));
describe('System', function () {
    it('should init all dependent systems', function () {
        beril.application('test', [beril.ThreeRenderSystem])
            .system('Bar', Bar)
            .system('Foo', Foo)
            .run(function (Foo, Bar) {
            console.log("===> Foo, Bar", Foo.initialized, Bar.initialized);
        });
    });
});
