﻿/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Heat extends Phaser.Sprite {
        radius: number = 75;
        intensity: number = 1;
        fadeRate: number = 0.05;
        constructor(game: Phaser.Game, x: number, y: number, radius?: number, intensity?: number) {
            super(game, x, y);
            if (typeof (radius) != 'undefined') {
                this.radius = radius;
            }
            if (typeof (intensity) != 'undefined') {
                this.intensity = intensity;
            }
            console.log("hello!");
            game.add.existing(this);
            game.time.events.loop(Phaser.Timer.SECOND, this.decay, this);
            game.physics.p2.enable(this, true);
            this.body.clearShapes();
            this.body.setCircle(this.radius);
            this.body.kinematic = true;
        }
        setDebug(d: boolean) {
            this.body.debug = d;
        }
        decay() {
            this.intensity -= this.fadeRate;
            this.radius += 3;
            if (this.body) this.body.setCircle(this.radius);
            if (this.intensity <= 0) {
                console.log("bye!");
                this.destroy();
            }
        }
    }
}
