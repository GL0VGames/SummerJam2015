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
            this.body.damping = 0.9;
            this.body.angularDamping = 0.9;
        }
    }
    export class Bacon extends Food {
        cookRate: Number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'bacon', 0);
            this.scale.setTo(0.165, 0.165);
            this.body.setRectangle(235, 50);
        }
    }
    export class Sausage extends Food {
        cookRate: Number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'sausage', 0);
            this.body.setRectangle(160, 40);
        }
    }
    export class Pancake extends Food {
        cookRate: Number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pancake', 0);
            this.body.setRectangle(160, 40);
        }
    }
    export class HashBrown extends Food {
        cookRate: Number = 1;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'hashbrown', 0);
            this.body.setRectangle(160, 40);
        }
    }
}
