/// <reference path="lib/phaser.d.ts"/>
/// <reference path="Heat.ts"/>

module CookingGame {
    export class Food extends Phaser.Sprite {
        cookRate: number = 0.01;
        cookProgress: number = 0;
        constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number) {
            super(game, x, y, key, frame);
            this.smoothed = true;
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.damping = 0.95;
            this.body.angularDamping = 0.95;
        }
        cook(heats: Phaser.Group) {
            heats.forEach(function (heat: Heat) {
                if (Phaser.Math.distance(this.x, this.y, heat.x, heat.y) <= heat.radius) {
                    this.cookProgress += this.cookRate * heat.intensity;
                    console.log(this.cookProgress);
                }
                if (this.cookProgress < 125) {
                    var red: number = 255 - Math.floor(this.cookProgress / 100 * (0xff - 0x7e));
                    var green: number = 255 - Math.floor(this.cookProgress / 100 * (0xff - 0x39));
                    var blue: number = 255 - Math.floor(this.cookProgress / 100 * (0xff - 0x2a));
                    this.tint = red * 0x010000 + green * 0x000100 + blue;
                }
            }, this, true);
        }
    }
    export class Bacon extends Food {
        cookRate: number = 0.04;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'bacon', 0);
            this.scale.setTo(0.165, 0.165);
            this.body.setRectangle(235, 50);
        }
        cook(heats: Phaser.Group) {
            super.cook(heats);
            if (this.cookProgress < 100) {
                this.scale.x = 0.165 - 0.015 * this.cookProgress / 100;
            } else {
                this.loadTexture('bacon_cooked');
                this.scale.x = 0.165;
                this.tint = 0xFFFFFF;
            }
        }
    }
    export class Sausage extends Food {
        cookRate: number = 0.01;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'sausage', 0);
            this.body.setRectangle(160, 40);
            this.scale.setTo(0.165, 0.165);
        }
    }
    export class Pancake extends Food {
        cookRate: number = 0.01;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pancakes', 0);
            this.body.setRectangle(160, 40);
            this.scale.setTo(0.165, 0.165);
        }
    }
    export class HashBrown extends Food {
        cookRate: number = 0.01;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'taters', 0);
            this.body.setRectangle(210, 110);
            this.scale.setTo(0.165, 0.165);
        }
    }
}
