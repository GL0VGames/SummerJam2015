/// <reference path="lib/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CookingGame;
(function (CookingGame) {
    var FryingPan = (function (_super) {
        __extends(FryingPan, _super);
        function FryingPan(game, x, y) {
            _super.call(this, game, x, y, 'pan', 0);
            this.slideRate = 150;
            this.rotationRate = 0.3;
            this.radius = 300;
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            //this.body.loadPolygon('physicsData', 'pan');
        }
        return FryingPan;
    })(Phaser.Sprite);
    CookingGame.FryingPan = FryingPan;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Pan.js.map