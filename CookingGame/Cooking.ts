﻿/// <reference path="lib/phaser.d.ts"/>
/// <reference path="Pan.ts"/>
/// <reference path="Spatula.ts"/>
/// <reference path="Food.ts"/>
/// <reference path="Heat.ts"/>

module CookingGame {
    export class Cooking extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        sizzle: Phaser.Sound;
        pan: FryingPan;
        spatula: Spatula;
        food: Phaser.Group;
        heat: Phaser.Group;
        panCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        spatulaCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        foodCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        create() {
            this.background = this.add.sprite(0, 0, 'stovetop');
            this.background.scale.setTo(0.4, 0.4);
            this.music = this.add.audio('music', 1, false);
            this.sizzle = this.add.audio('sizzle', 1, true);
            this.sizzle.play();
            console.log(this.sizzle.isPlaying);

            // physics setup
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.restitution = 0.8;
            this.panCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.spatulaCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();

            // create stuff
            this.pan = new FryingPan(this.game, 240, 240);
            this.pan.body.setCollisionGroup(this.panCollisionGroup);
            this.pan.body.collides([this.foodCollisionGroup]);

            this.spatula = new Spatula(this.game, 100, 100);
            //this.spatula.body.setCollisionGroup(this.spatulaCollisionGroup);
            this.spatula.body.collides([this.foodCollisionGroup]);

            this.food = new Phaser.Group(this.game, undefined, 'foodGroup', false, true, Phaser.Physics.P2JS);
            for (var i = 0; i < 4; i++) {
                var food_item = new Bacon(this.game, 160 + 40 * i, 160 + 40 * i);
                this.food.add(food_item);
                food_item.body.setCollisionGroup(this.foodCollisionGroup);
                food_item.body.collides([this.panCollisionGroup, this.spatulaCollisionGroup, this.foodCollisionGroup]);
            }

            this.heat = new Phaser.Group(this.game, undefined, 'heatGroup', false);

            // mouse input events
            var that = this;
            function mouseWheel(event) {
                switch (that.game.input.mouse.wheelDelta) {
                    case Phaser.Mouse.WHEEL_UP:
                        that.spatula.body.rotation -= that.spatula.rotationRate;
                        break;
                    case Phaser.Mouse.WHEEL_DOWN:
                        that.spatula.body.rotation += that.spatula.rotationRate;
                        break;
                }
            }
            this.game.input.mouse.mouseWheelCallback = mouseWheel;
            function mouseDown(event) {
                that.spatula.scale.setTo(0.25, 0.25);
                that.spatula.body.setCollisionGroup(that.spatulaCollisionGroup);
                that.spatula.body.collides([that.foodCollisionGroup]);
            }
            this.game.input.onDown.add(mouseDown);
            function mouseUp(event) {
                that.spatula.scale.setTo(0.275, 0.275);
                that.spatula.body.clearCollision(true);
            }
            this.game.input.onUp.add(mouseUp);

            // timer
            this.game.time.events.loop(333, makeHeat, this);
            function makeHeat() {
                var heat: Heat = new Heat(this.game, 240, 240);
                this.heat.add(heat);
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
                this.heat.forEach(function (heat: Heat) {
                    heat.y -= this.pan.slideRate;
                }, this, true);
                force_y = -260;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                this.pan.body.moveDown(this.pan.slideRate);
                this.heat.forEach(function (heat: Heat) {
                    heat.y += this.pan.slideRate;
                }, this, true);
                force_y = 260;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.pan.body.moveLeft(this.pan.slideRate);
                this.heat.forEach(function (heat: Heat) {
                    heat.x -= this.pan.slideRate;
                }, this, true);
                force_x = -260;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.pan.body.moveRight(this.pan.slideRate);
                this.heat.forEach(function (heat: Heat) {
                    heat.x += this.pan.slideRate;
                }, this, true);
                force_x = 260;
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
            
            // cook food!
            var that = this;
            this.food.forEach(function (food_item: Food) {
                food_item.cook(that.heat);
            }, this, true);

        }
    }
}