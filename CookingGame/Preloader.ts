/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite;
        preload() {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
 
            //  Load our actual games assets
            this.load.image('titlepage', 'img/titlepage.jpg');
            this.load.image('logo', 'img/logo.png');
            this.load.audio('music', 'img/title.mp3', true);
            this.load.spritesheet('simon', 'img/simon.png', 58, 96, 5);
            this.load.image('level1', 'img/level1.png');
            this.load.image('bacon', 'img/bacon_uncooked.png');
            this.load.image('bacon_cooked', 'img/bacon_cooked.png');
            this.load.image('pan', 'img/fryingpan.png');
            this.load.image('spatula', 'img/spatula.png');
            this.load.image('stovetop', 'img/stove2.png');
        }
        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }
        startMainMenu() {
            //this.game.state.start('MainMenu', true, false);
            this.game.state.start('Cooking', true, false);
        }
    }
}
