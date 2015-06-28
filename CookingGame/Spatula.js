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
            this.rotationRate = 0.3;
            this.anchor.setTo(0.1, 0.5);
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.setRectangle(80, 10);
            this.body.kinematic = true;
        }
        Spatula.prototype.update = function () {
            //this.body.x = this.game.input.x;
            //this.body.y = this.game.input.y;
        };
        return Spatula;
    })(Phaser.Sprite);
    CookingGame.Spatula = Spatula;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Spatula.js.map