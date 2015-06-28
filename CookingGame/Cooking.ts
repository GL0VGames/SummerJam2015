﻿/// <reference path="lib/phaser.d.ts"/>
/// <reference path="Pan.ts"/>
/// <reference path="Spatula.ts"/>
/// <reference path="Food.ts"/>

module CookingGame {
    export class Cooking extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        pan: FryingPan;
        spatula: Spatula;
        food: Phaser.Group;
        panCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        spatulaCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        foodCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        create() {
            this.background = this.add.sprite(0, 0, 'stovetop');
            this.background.scale.setTo(0.4, 0.4);
            this.music = this.add.audio('music', 1, false);
            //this.music.play();

            // physics setup
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.restitution = 0.8;
            this.panCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.spatulaCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();

            // create stuff
            this.pan = new FryingPan(this.game, 50, 50);
            this.pan.body.setCollisionGroup(this.panCollisionGroup);

            this.spatula = new Spatula(this.game, 100, 100);
            //this.spatula.spring = this.game.physics.p2.createSpring(this.spatula.body, this.pan.body, this.pan.radius, 1000, 1);

            this.food = new Phaser.Group(this.game, undefined, 'foodGroup', false, true, Phaser.Physics.P2JS);
            for (var i = 0; i < 4; i++) {
                var food_item = new Bacon(this.game, 80 + 20 * i, 80 + 10 * i);
                this.food.add(food_item);
                food_item.body.setCollisionGroup(this.foodCollisionGroup);
                food_item.body.collides([this.panCollisionGroup, this.spatulaCollisionGroup, this.foodCollisionGroup]);
                food_item.tether = new Phaser.Sprite(this.game,(food_item.x + this.pan.x) / 2,(food_item.y + this.pan.y) / 2);

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
            var force_x: number = 0;
            var force_y: number = 0;
            this.pan.body.velocity.x = 0;
            this.pan.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.pan.body.moveUp(this.pan.slideRate);
                force_y = -100;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                this.pan.body.moveDown(this.pan.slideRate);
                force_y = 100;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.pan.body.moveLeft(this.pan.slideRate);
                force_x = -100;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.pan.body.moveRight(this.pan.slideRate);
                force_x = 100;
            }
            //if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            //    this.pan.body.rotation += this.pan.rotationRate;
            //}
            //else if (this.game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            //    this.pan.body.rotation -= this.pan.rotationRate;
            //}
            this.food.forEach(function (food_item: Food) {
                food_item.body.force.x = force_x;
                food_item.body.force.y = force_y;
            }, this, true);
        }
        endCooking() {
            this.food.forEach(function (food_item: Food) {
                food_item.kill();
            }, this, true);
        }
    }
}