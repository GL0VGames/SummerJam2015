/// <reference path="lib/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CookingGame;
(function (CookingGame) {
    var Food = (function (_super) {
        __extends(Food, _super);
        function Food(game, x, y, key, frame) {
            _super.call(this, game, x, y, key, frame);
            this.cookProgress = 0;
            this.smoothed = true;
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.velocity.x = Math.random() * 60 - 30;
        }
        return Food;
    })(Phaser.Sprite);
    CookingGame.Food = Food;
    var Bacon = (function (_super) {
        __extends(Bacon, _super);
        function Bacon(game, x, y) {
            _super.call(this, game, x, y, 'bacon', 0);
            this.cookRate = 1;
            this.body.setRectangle(160, 40);
        }
        return Bacon;
    })(Food);
    CookingGame.Bacon = Bacon;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Food.js.map