/// <reference path="lib/phaser.d.ts"/>
/// <reference path="Heat.ts"/>

module CookingGame {
    export class Food extends Phaser.Sprite {
        cookRate: number;
        cookProgress: number = 0;
        constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number) {
            super(game, x, y, key, frame);
            this.smoothed = true;
            game.add.existing(this);
            game.physics.p2.enable(this, true);
            this.body.damping = 0.9;
            this.body.angularDamping = 0.9;
        }
        cook(heats: Phaser.Group) {
            heats.forEach(function (heat: Heat) {
                if (Phaser.Math.distance(this.x, this.y, heat.x, heat.y) < heat.radius) {
                    this.cookProgress += this.cookRate * heat.intensity;
                }
            }, this, true);
            var red: number = 255 - (this.cookProgress / 100 * (0xff - 0x7e));
            var green: number = 255 - (this.cookProgress / 100 * (0xff - 0x39));
            var blue: number = 255 - (this.cookProgress / 100 * (0xff - 0x2a));
            this.tint = red * 0x010000 + green * 0x000100 + blue * 0x000001;

            var q = this.cookProgress;
            switch (true) {
                case (q < 25):
                    // do nothing
                    break;
                case (q < 50):
                    // 25-50%
                    break;
                case (q < 75):
                    // 50-75%
                    break;
                case (q < 100):
                    // 75-100%
                    break;
                case (q < 125):
                    // 100-125%
                    break;
                case (q >= 125):
                    // 125%+
                    break;
            }
        }
    }
    export class Bacon extends Food {
        cookRate: number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'bacon', 0);
            this.scale.setTo(0.165, 0.165);
            this.body.setRectangle(235, 50);
        }
    }
    export class Sausage extends Food {
        cookRate: number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'sausage', 0);
            this.body.setRectangle(160, 40);
        }
    }
    export class Pancake extends Food {
        cookRate: number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pancake', 0);
            this.body.setRectangle(160, 40);
        }
    }
    export class HashBrown extends Food {
        cookRate: number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'hashbrown', 0);
            this.body.setRectangle(160, 40);
        }
    }
}
