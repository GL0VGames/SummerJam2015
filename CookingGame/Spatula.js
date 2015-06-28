/// <reference path="lib/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CookingGame;
(function (CookingGame) {
    var Spatula = (function (_super) {
        __extends(Spatula, _super);
        function Spatula(game, x, y) {
            _super.call(this, game, x, y, 'spatula', 0);
            this.slideRate = 150;
            this.rotationRate = 0.12;
            this.scale.setTo(0.3, 0.3);
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.setRectangle(120, 12);
            this.body.kinematic = true;
            this.anchor.setTo(0.5, 0.025);
        }
        Spatula.prototype.update = function () {
            var x_dist = this.game.input.x - this.x;
            var y_dist = this.game.input.y - this.y;
            this.body.moveRight(x_dist * 6);
            this.body.moveDown(y_dist * 6);
        };
        return Spatula;
    })(Phaser.Sprite);
    CookingGame.Spatula = Spatula;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Spatula.js.map