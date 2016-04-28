define(["require", "exports", '../../src/beril'], function (require, exports, beril) {
    beril.BasicApplication.prototype.looper = function (avoidInfinte) {
        this.animate();
    };
});
