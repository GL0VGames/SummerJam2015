/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Spatula extends Phaser.Sprite {
        slideRate: number = 150;
        rotationRate: number = 0.3;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'spatula', 0);
            this.anchor.setTo(0.5, 0.5);
            this.body.setRectangle(80, 10);
            game.add.existing(this);
        }
    }
}