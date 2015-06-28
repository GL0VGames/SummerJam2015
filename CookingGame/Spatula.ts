/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Spatula extends Phaser.Sprite {
        slideRate: number = 150;
        rotationRate: number = 0.3;
        spring: any;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'spatula', 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.setRectangle(80, 10);
        }
        update() {
            this.body.x = this.game.input.x;
            this.body.y = this.game.input.y;
        }
    }
}