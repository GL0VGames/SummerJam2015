/// <reference path="lib/phaser.d.ts"/>
/// <reference path="Pan.ts"/>
/// <reference path="Spatula.ts"/>
/// <reference path="Food.ts"/>

module CookingGame {
    export class Cooking extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        pan: Pan;
        spatula: Spatula;
        food: Phaser.Group;
        panCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        spatulaCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        foodCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        create() {
            this.background = this.add.sprite(0, 0, 'level1');
            this.music = this.add.audio('music', 1, false);
            //this.music.play();

            // physics setup
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.restitution = 0.8;
            this.spatulaCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();

            // create stuff
            this.pan = new Pan(this.game, 50, 50);
            this.pan.body.setCollisionGroup(this.panCollisionGroup);

            this.spatula = new Spatula(this.game, 100, 100);

            this.food = new Phaser.Group(this.game, undefined, 'foodGroup', false, true, Phaser.Physics.P2JS);
            for (var i = 0; i < 4; i++) {
                var food_item = new Bacon(this.game, 80 + 20 * i, 80 + 10 * i);
                food_item.body.setCollisionGroup(this.foodCollisionGroup);
                food_item.body.collides([this.panCollisionGroup, this.spatulaCollisionGroup, this.foodCollisionGroup]);
                food_item.spring = this.game.physics.p2.createSpring(food_item.body, this.pan.body, this.pan.radius, 1000, 1);
                this.food.add(food_item);
            }

            // mousewheel input
            this.game.input.mouse.mouseWheelCallback = mouseWheel;
            var that = this;
            function mouseWheel(event) {
                switch (that.game.input.mouse.wheelDelta) {
                    case Phaser.Mouse.WHEEL_UP:
                        that.spatula.rotation -= that.spatula.rotationRate;
                        break;
                    case Phaser.Mouse.WHEEL_DOWN:
                        that.spatula.rotation += that.spatula.rotationRate;
                        break;
                }
            }

        }
        update() {
            // handle input
            this.pan.body.SetZeroVelocity();
            this.food.forEach(function (food_item: Food) {
                food_item.body.SetZeroVelocity();
            }, this, true);
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.pan.body.moveUp(this.pan.slideRate);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                this.pan.body.moveDown(this.pan.slideRate);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.pan.body.moveLeft(this.pan.slideRate);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.pan.body.moveRight(this.pan.slideRate);
            }
            //if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            //    this.pan.body.rotation += this.pan.rotationRate;
            //}
            //else if (this.game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            //    this.pan.body.rotation -= this.pan.rotationRate;
            //}
        }
        endCooking() {
            this.food.forEach(function (food_item: Food) {
                food_item.kill();
            }, this, true);
        }
    }
}