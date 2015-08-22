/*class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
*/

class SimpleGame {

    game: Phaser.Game;
    sp_Bob: Phaser.Sprite;
    cursors: Phaser.CursorKeys;


    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

  

    preload() {
        this.game.load.image('logo', './Graphics/logo.png');
        this.game.load.spritesheet('bob', './Graphics/bob.png', 108, 140, 8);

    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
         this.sp_Bob = this.game.add.sprite(50, 50, 'bob');

         this.sp_Bob.animations.add('walk');

         //this.sp_Bob.animations.play('walk', 8, true);


        //sp_Bob.anchor.setTo(0.5, 0.5);
         this.sp_Bob.scale.setTo(0.5, 0.5);

        //this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);

        //logo.anchor.setTo(0.5, 0.5);
        //logo.animations.play;

         this.game.physics.arcade.enable(this.sp_Bob);

         //  Player physics properties. Give the little guy a slight bounce.
         this.sp_Bob.body.bounce.y = 0.2;
         this.sp_Bob.body.gravity.y = 300;
         this.sp_Bob.body.collideWorldBounds = true;
    }

    update() {

        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        if (this.cursors.left.isDown) {
            
            this.sp_Bob.body.velocity.x = -150;
            this.sp_Bob.animations.play('walk', 8, true);
        }
        else if (this.cursors.right.isDown) {

            this.sp_Bob.body.velocity.x = 150;
            this.sp_Bob.animations.play('walk', 8, true);
            
        }
        else {
            this.sp_Bob.body.velocity.x = 0;
            this.sp_Bob.animations.stop();

        }


    }

}

window.onload = () => {

    var game = new SimpleGame();



};
