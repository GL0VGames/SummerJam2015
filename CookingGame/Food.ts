/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Food extends Phaser.Sprite {
        cookRate: Number;
        cookProgress: Number = 0;
        spring: any;//Phaser.Physics.P2JS.Spring;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y);
            this.body.velocity.x = 30;
            this.smoothed = true;
        }
    }
    export class Bacon extends Food {
        cookRate: Number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y);
            this.body.setRectangle(160, 40);

        }
    }
}
