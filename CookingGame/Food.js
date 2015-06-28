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
            this.body.damping = 0.5;
            this.body.angularDamping = 0.5;
        }
        return Food;
    })(Phaser.Sprite);
    CookingGame.Food = Food;
    var Bacon = (function (_super) {
        __extends(Bacon, _super);
        function Bacon(game, x, y) {
            _super.call(this, game, x, y, 'bacon', 0);
            this.cookRate = 1;
            this.scale.setTo(0.165, 0.165);
            this.body.setRectangle(235, 50);
        }
        return Bacon;
    })(Food);
    CookingGame.Bacon = Bacon;
    var Sausage = (function (_super) {
        __extends(Sausage, _super);
        function Sausage(game, x, y) {
            _super.call(this, game, x, y, 'sausage', 0);
            this.cookRate = 1;
            this.body.setRectangle(160, 40);
        }
        return Sausage;
    })(Food);
    CookingGame.Sausage = Sausage;
    var Pancake = (function (_super) {
        __extends(Pancake, _super);
        function Pancake(game, x, y) {
            _super.call(this, game, x, y, 'pancake', 0);
            this.cookRate = 1;
            this.body.setRectangle(160, 40);
        }
        return Pancake;
    })(Food);
    CookingGame.Pancake = Pancake;
    var HashBrown = (function (_super) {
        __extends(HashBrown, _super);
        function HashBrown(game, x, y) {
            _super.call(this, game, x, y, 'hashbrown', 0);
            this.cookRate = 1;
            this.body.setRectangle(160, 40);
        }
        return HashBrown;
    })(Food);
    CookingGame.HashBrown = HashBrown;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Food.js.map