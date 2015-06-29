/// <reference path="lib/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CookingGame;
(function (CookingGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            var that = this;
            this.background = this.add.sprite(0, 0, 'menu');
            this.background.scale.setTo(0.4, 0.4);
            this.bacon = this.add.button(0, 250, 'mbacon', function () {
                that.startGame('bacon');
            }, this);
            this.bacon.scale.setTo(0.4, 0.4);
            this.bacon.events.onInputOver.add(function () {
                that.bacon.loadTexture('mbacon_hover', 0);
            }, this);
            this.bacon.events.onInputOut.add(function () {
                that.bacon.loadTexture('mbacon', 0);
            }, this);
            this.sausage = this.add.button(400, 250, 'msausage', function () {
                that.startGame('sausage');
            }, this);
            this.sausage.scale.setTo(0.4, 0.4);
            this.sausage.events.onInputOver.add(function () {
                that.sausage.loadTexture('msausage_hover', 0);
            }, this);
            this.sausage.events.onInputOut.add(function () {
                that.sausage.loadTexture('msausage', 0);
            }, this);
            this.pancake = this.add.button(0, 350, 'mpancake', function () {
                that.startGame('pancake');
            }, this);
            this.pancake.scale.setTo(0.4, 0.4);
            this.pancake.events.onInputOver.add(function () {
                that.pancake.loadTexture('mpancake_hover', 0);
            }, this);
            this.pancake.events.onInputOut.add(function () {
                that.pancake.loadTexture('mpancake', 0);
            }, this);
            this.taters = this.add.button(400, 350, 'mtaters', function () {
                that.startGame('taters');
            }, this);
            this.taters.scale.setTo(0.4, 0.4);
            this.taters.events.onInputOver.add(function () {
                that.taters.loadTexture('mtaters_hover', 0);
            }, this);
            this.taters.events.onInputOut.add(function () {
                that.taters.loadTexture('mtaters', 0);
            }, this);
            this.logo = this.add.button(700, 500, 'logo', function () {
                window.open('http://www.gl0vgames.com', '_blank');
            });
            this.logo.scale.setTo(0.4, 0.4);
            this.logo.events.onInputOver.add(function () {
                that.logo.loadTexture('logo_hover', 0);
            }, this);
            this.logo.events.onInputOut.add(function () {
                that.logo.loadTexture('logo', 0);
            }, this);
        };
        MainMenu.prototype.startGame = function (mode) {
            this.game.state.start('Cooking', true, false, mode);
        };
        return MainMenu;
    })(Phaser.State);
    CookingGame.MainMenu = MainMenu;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=MainMenu.js.map