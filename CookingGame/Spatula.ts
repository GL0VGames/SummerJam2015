/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Spatula extends Phaser.Sprite {
        slideRate: number = 150;
        rotationRate: number = 0.12;
        spring: any;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'spatula', 0);
            this.scale.setTo(0.25, 0.25);
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.setRectangle(120, 12);
            this.body.kinematic = true;
            this.body.angularDamping = 1;
            this.anchor.setTo(0.5, 0.025);
        }
        update() {
            var x_dist: number = this.game.input.x - this.x;
            var y_dist: number = this.game.input.y - this.y;
            this.body.moveRight(x_dist * 6);
            this.body.moveDown(y_dist * 6);

        }
    }
}