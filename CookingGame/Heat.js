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
            this.fadeRate = 0.05;
            if (typeof (radius) != 'undefined') {
                this.radius = radius;
            }
            if (typeof (intensity) != 'undefined') {
                this.intensity = intensity;
            }
            console.log("hello!");
            game.add.existing(this);
            game.time.events.loop(Phaser.Timer.SECOND, this.decay, this);
            game.physics.p2.enable(this, true);
            this.body.clearShapes();
            this.body.setCircle(this.radius);
            this.body.kinematic = true;
        }
        Heat.prototype.decay = function () {
            this.intensity -= this.fadeRate;
            if (this.intensity <= 0) {
                console.log("bye!");
                this.destroy();
            }
        };
        return Heat;
    })(Phaser.Sprite);
    CookingGame.Heat = Heat;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Heat.js.map