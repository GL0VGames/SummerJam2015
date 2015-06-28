/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class FryingPan extends Phaser.Sprite {
        slideRate: number = 150;
        rotationRate: number = 0.3;
        radius: number = 300;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pan', 0);
            this.anchor.setTo(0.5, 0.5);
            this.scale.setTo(0.5, 0.5);
            this.smoothed = true;
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.clearShapes();
            this.body.kinematic = true;
            //this.body.loadPolygon('physicsData', 'pan');
        }
    }
}