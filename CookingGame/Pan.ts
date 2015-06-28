/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Pan extends Phaser.Sprite {
        slideRate: number = 150;
        rotationRate: number = 0.3;
        radius: number = 300;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pan', 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            //this.body.loadPolygon('physicsData', 'pan');
        }
    }
}