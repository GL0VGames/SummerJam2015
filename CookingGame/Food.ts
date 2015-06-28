/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Food extends Phaser.Sprite {
        cookRate: Number;
        cookProgress: Number = 0;
        tether: Phaser.Sprite;
        constraint1: any;
        constraint2: any;
        spring: any; // Phaser.Physics.P2JS.Spring?;
        constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number) {
            super(game, x, y, key, frame);
            this.smoothed = true;
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.damping = 0.5;
            this.body.angularDamping = 0.5;
        }
    }
    export class Bacon extends Food {
        cookRate: Number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'bacon', 0);
            this.scale.setTo(0.2, 0.2);
            this.body.setRectangle(160, 40);
        }
    }
}
