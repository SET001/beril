define(["require", "exports", '../../src/index'], function (require, exports, beril) {
    beril.BasicApplication.prototype.looper = function () {
        this.animate();
    };
});
