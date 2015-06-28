/// <reference path="lib/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CookingGame;
(function (CookingGame) {
    var Heat = (function (_super) {
        __extends(Heat, _super);
        function Heat(game, x, y, radius, intensity) {
            _super.call(this, game, x, y);
            this.radius = 40;
            this.intensity = 1;
            this.fadeRate = 0.2;
            this.radius = radius;
            this.intensity = intensity;
            game.add.existing(this);
        }
        Heat.prototype.update = function () {
            this.intensity -= this.fadeRate;
            if (this.intensity <= 0) {
                this.kill();
            }
        };
        return Heat;
    })(Phaser.Sprite);
    CookingGame.Heat = Heat;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Heat.js.map