/// <reference path="lib/phaser.d.ts"/>
/// <reference path="Pan.ts"/>
/// <reference path="Spatula.ts"/>
/// <reference path="Food.ts"/>
/// <reference path="Heat.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CookingGame;
(function (CookingGame) {
    var Cooking = (function (_super) {
        __extends(Cooking, _super);
        function Cooking() {
            _super.apply(this, arguments);
            this.debug = false;
        }
        Cooking.prototype.init = function (mode) {
            this.mode = mode;
        };
        Cooking.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'stovetop');
            this.background.scale.setTo(0.4, 0.4);
            this.music = this.add.audio('music', 1, false);
            this.sizzle = this.add.audio('sizzle', 0.5, true);
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
            this.pan = new CookingGame.FryingPan(this.game, 240, 240);
            this.pan.body.setCollisionGroup(this.panCollisionGroup);
            this.pan.body.collides([this.foodCollisionGroup]);
            this.pan.body.debug = this.debug;
            this.food = new Phaser.Group(this.game, undefined, 'foodGroup', false, true, Phaser.Physics.P2JS);
            switch (this.mode) {
                case 'bacon':
                    for (var i = 0; i < 4; i++) {
                        var food_item = new CookingGame.Bacon(this.game, 180 + 40 * i, 180 + 40 * i);
                        this.food.add(food_item);
                        food_item.body.setCollisionGroup(this.foodCollisionGroup);
                        food_item.body.collides([this.panCollisionGroup, this.spatulaCollisionGroup, this.foodCollisionGroup]);
                        food_item.body.debug = this.debug;
                    }
                    break;
                case 'sausage':
                    for (var i = 0; i < 3; i++) {
                        var food_item = new CookingGame.Sausage(this.game, 200 + 40 * i, 200 + 40 * i);
                        this.food.add(food_item);
                        food_item.body.setCollisionGroup(this.foodCollisionGroup);
                        food_item.body.collides([this.panCollisionGroup, this.spatulaCollisionGroup, this.foodCollisionGroup]);
                        food_item.body.debug = this.debug;
                    }
                    break;
                case 'pancake':
                    for (var i = 0; i < 2; i++) {
                        var food_item = new CookingGame.Pancake(this.game, 170 + 140 * i, 170 + 140 * i);
                        this.food.add(food_item);
                        food_item.body.setCollisionGroup(this.foodCollisionGroup);
                        food_item.body.collides([this.panCollisionGroup, this.spatulaCollisionGroup, this.foodCollisionGroup]);
                        food_item.body.debug = this.debug;
                    }
                    break;
                case 'taters':
                    for (var i = 0; i < 3; i++) {
                        var food_item = new CookingGame.HashBrown(this.game, 200 + 40 * i, 130 + 110 * i);
                        this.food.add(food_item);
                        food_item.body.setCollisionGroup(this.foodCollisionGroup);
                        food_item.body.collides([this.panCollisionGroup, this.spatulaCollisionGroup, this.foodCollisionGroup]);
                        food_item.body.debug = this.debug;
                    }
                    break;
            }
            this.heat = new Phaser.Group(this.game, undefined, 'heatGroup', false);
            this.spatula = new CookingGame.Spatula(this.game, 100, 100);
            //this.spatula.body.setCollisionGroup(this.spatulaCollisionGroup);
            this.spatula.body.collides([this.foodCollisionGroup]);
            this.spatula.body.debug = this.debug;
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
                var heat = new CookingGame.Heat(this.game, 240, 240);
                this.heat.add(heat);
                //this.heat.body.debug = this.debug;
                // cook food!
                this.food.forEach(function (food_item) {
                    food_item.cook(this.heat);
                }, this, true);
            }
        };
        Cooking.prototype.update = function () {
            // handle input
            var force_x = 0;
            var force_y = 0;
            var slide_x = 0;
            var slide_y = 0;
            this.pan.body.velocity.x = 0;
            this.pan.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                force_y = -700;
                slide_y = -this.pan.slideRate;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                force_y = 700;
                slide_y = this.pan.slideRate;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                force_x = -700;
                slide_x = -this.pan.slideRate;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                force_x = 700;
                slide_x = this.pan.slideRate;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.TILDE)) {
                if (this.debug) {
                    this.food.forEach(function (f) {
                        f.body.debug = false;
                    }, this, true);
                    this.heat.forEach(function (f) {
                        f.body.debug = false;
                    }, this, true);
                    this.spatula.body.debug = false;
                    this.pan.body.debug = false;
                    this.debug = false;
                }
                else {
                    this.food.forEach(function (f) {
                        f.body.debug = true;
                    }, this, true);
                    this.heat.forEach(function (f) {
                        f.body.debug = true;
                    }, this, true);
                    this.spatula.body.debug = true;
                    this.pan.body.debug = true;
                    this.debug = true;
                }
            }
            this.food.forEach(function (food_item) {
                food_item.body.force.x = force_x;
                food_item.body.force.y = force_y;
            }, this, true);
            this.pan.body.moveRight(slide_x);
            this.pan.body.moveDown(slide_y);
            this.heat.forEach(function (heat) {
                heat.body.moveRight(slide_x);
                heat.body.moveDown(slide_y);
                heat.setDebug(this.debug);
            }, this, true);
        };
        return Cooking;
    })(Phaser.State);
    CookingGame.Cooking = Cooking;
})(CookingGame || (CookingGame = {}));
//# sourceMappingURL=Cooking.js.map