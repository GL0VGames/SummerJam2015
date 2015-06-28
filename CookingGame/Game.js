/// <reference path="lib/phaser.d.ts"/>
/// <reference path="Boot.ts"/>
/// <reference path="MainMenu.ts"/>
/// <reference path="Preloader.ts"/>
/// <reference path="Cooking.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CookingGame;
(function (CookingGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('Boot', CookingGame.Boot, false);
            this.state.add('Preloader', CookingGame.Preloader, false);
            this.state.add('MainMenu', CookingGame.MainMenu, false);
            this.state.add('Cooking', CookingGame.Cooking, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    CookingGame.Game = Game;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Game.js.map