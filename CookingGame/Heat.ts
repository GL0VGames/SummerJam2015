/// <reference path="lib/phaser.d.ts"/>

module CookingGame {
    export class Heat extends Phaser.Sprite {
        radius: number = 40;
        intensity: number = 1;
        fadeRate: number = 0.2;
        constructor(game: Phaser.Game, x: number, y: number, radius?: number, intensity?: number) {
            super(game, x, y);
            this.radius = radius;
            this.intensity = intensity;
            game.add.existing(this);
        }
        update() {
            this.intensity -= this.fadeRate;
            if (this.intensity <= 0) {
                this.kill();
            }
        }
    }
}
