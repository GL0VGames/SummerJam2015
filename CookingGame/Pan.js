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
            this.scale.setTo(0.5, 0.5);
            this.smoothed = true;
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.clearShapes();
            this.body.kinematic = true;
            this.anchor.setTo(0.30, 0.5);
            //this.body.loadPolygon('physicsData', 'pan');
            var geom = [[85, 1115, 295, 1308, 327, 1244, 147, 1068], [147, 1068, 65, 822, 0, 820, 87, 1114], [38, 519, 0, 823, 67, 822, 116, 542], [39, 519, 113, 545, 299, 330, 259, 251], [611, 230, 613, 152, 259, 249, 298, 333], [293, 1312, 600, 1392, 604, 1326, 326, 1243], [917, 1246, 949, 1318, 1159, 1125, 1091, 1068], [1090, 1068, 1158, 1126, 1247, 832, 1158, 834], [1116, 556, 1161, 834, 1230, 835, 1188, 531], [1119, 555, 1189, 529, 1001, 259, 933, 336], [605, 152, 609, 234, 934, 331, 999, 261], [605, 1328, 605, 1392, 948, 1314, 923, 1247]];
            this.body.addPolygon({}, geom);
        }
        FryingPan.prototype.update = function () {
        };
        return FryingPan;
    })(Phaser.Sprite);
    CookingGame.FryingPan = FryingPan;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Pan.js.map