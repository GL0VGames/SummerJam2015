/// <reference path="lib/phaser.d.ts"/>
/// <reference path="Heat.ts"/>
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
            this.body.damping = 0.9;
            this.body.angularDamping = 0.9;
        }
        Food.prototype.cook = function (heats) {
            heats.forEach(function (heat) {
                if (Phaser.Math.distance(this.x, this.y, heat.x, heat.y) < heat.radius) {
                    this.cookProgress += this.cookRate * heat.intensity;
                }
            }, this, true);
            var red = 255 - (this.cookProgress / 100 * (0xff - 0x7e));
            var green = 255 - (this.cookProgress / 100 * (0xff - 0x39));
            var blue = 255 - (this.cookProgress / 100 * (0xff - 0x2a));
            this.tint = red * 0x010000 + green * 0x000100 + blue * 0x000001;
            var q = this.cookProgress;
            switch (true) {
                case (q < 25):
                    break;
                case (q < 50):
                    break;
                case (q < 75):
                    break;
                case (q < 100):
                    break;
                case (q < 125):
                    break;
                case (q >= 125):
                    break;
            }
        };
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