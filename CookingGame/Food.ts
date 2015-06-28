/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Food extends Phaser.Sprite {
        cookRate: Number;
        cookProgress: Number = 0;
        spring: any; // Phaser.Physics.P2JS.Spring?;
        constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number) {
            super(game, x, y, key, frame);
            this.smoothed = true;
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.velocity.x = Math.random() * 60 - 30;
        }
    }
    export class Bacon extends Food {
        cookRate: Number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'bacon', 0);
            this.body.setRectangle(160, 40);
        }
    }
}
