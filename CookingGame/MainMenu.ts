/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class MainMenu extends Phaser.State {
        background: Phaser.Sprite;
        bacon: Phaser.Button;
        sausage: Phaser.Button;
        pancake: Phaser.Button;
        taters: Phaser.Button;
        logo: Phaser.Button;
        create() {
            var that = this;
            this.background = this.add.sprite(0, 0, 'menu');
            this.background.scale.setTo(0.4, 0.4);
            this.bacon = this.add.button(0, 250, 'mbacon', function () {
                that.startGame('bacon');
            }, this);
            this.bacon.scale.setTo(0.4, 0.4);
            this.bacon.mouseover = function () {
                that.bacon.loadTexture('mbacon_hover', 0);
            };

            this.sausage = this.add.button(400, 250, 'msausage', function () {
                that.startGame('sausage');
            }, this);
            this.sausage.scale.setTo(0.4, 0.4);
            this.sausage.mouseover = function () {
                that.sausage.loadTexture('msausage_hover', 0);
            };

            this.pancake = this.add.button(0, 400, 'mpancake', function () {
                that.startGame('pancake');
            }, this);
            this.pancake.scale.setTo(0.4, 0.4);

            this.taters = this.add.button(400, 400, 'mtaters', function () {
                that.startGame('taters');
            }, this);
            this.taters.scale.setTo(0.4, 0.4);
        }
        startGame(mode: string) {
            this.game.state.start('Cooking', true, false, mode);
        }
    }
}