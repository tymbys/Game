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
class Bob { }


class SimpleGame {

    game: Phaser.Game;
    sp_Bob: Phaser.Sprite;
    cursors: Phaser.CursorKeys;
    platforms: Phaser.Group;
    explosprits: Phaser.Group;
    score: number;
    scoreText: Phaser.Text;
    count_gamp: number;
    

    constructor() {
        this.score = 100;
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
        
    }

  

    preload() {
        this.game.load.image('logo', './Graphics/logo.png');
        this.game.load.image('ground', './Graphics/Brick_Block_32x32.png');
        this.game.load.spritesheet('bob', './Graphics/bob_x0.5.png', 54, 70, 8);
        this.game.load.spritesheet('expl', './Graphics/explosprite_128x128.png', 32, 32, 4);

    }

    create() {

        this.count_gamp = 0;


        var logo = this.game.add.sprite(0, 0, 'logo');

        this.platforms = this.game.add.group();

        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        var ground = this.platforms.create(0, this.game.world.height - 100, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        //ground.scale.setTo(2, 1);
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        for (var i = 0; i < this.game.world.width / 32; i++)
        {
            ground = this.platforms.create(i * 32, this.game.world.height - 32, 'ground');
            ground.body.immovable = true;

        }

        //  Now let's create two ledges
        var ledge = this.platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;

        ledge = this.platforms.create(0, 250, 'ground');

        ledge.body.immovable = true


        //var explosprita = this.expl.create(0, 0, 'expl');
        
            //
        //explosprita.animations.add('expl_anim2', [5, 6, 7, 8], 10, true);
        
        //this.explosprits = this.game.add.group();
        //this.explosprits.enableBody = true;
        /*
        var explosprit = this.explosprits.create(100, this.game.world.height - 32, 'expl');
        explosprit.animations.add('expl_anim1', [0, 1, 2, 3],  10, true);
        explosprit.animations.play('expl_anim1', 4, true);
        explosprit.body.immovable = true; 
        */
        


        
         this.sp_Bob = this.game.add.sprite(0, 50, 'bob');

         this.sp_Bob.animations.add('walk');

         //this.sp_Bob.animations.play('walk', 8, true);


        //sp_Bob.anchor.setTo(0.5, 0.5);
         //this.sp_Bob.scale.setTo(0.5, 0.5);

        //this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);

        //logo.anchor.setTo(0.5, 0.5);
        //logo.animations.play;
         


         this.game.physics.startSystem(Phaser.Physics.ARCADE);
         this.game.physics.arcade.enable(this.sp_Bob);
         //  Player physics properties. Give the little guy a slight bounce.
         this.sp_Bob.body.bounce.y = 0.0;
         this.sp_Bob.body.gravity.y = 300;
         
         this.sp_Bob.body.collideWorldBounds = true;
    }

    update() {

       

        var is_collide = this.game.physics.arcade.collide(this.sp_Bob, this.platforms);
        //this.game.physics.arcade.collide(this.sp_Bob, this.explosprits);

        //if (is_collide!=true)   this.count_gamp = 0;
                
        console.log(is_collide);
        //this.game.physics.arcade.collide(this.explosprits, this.sp_Bob);
        //this.game.physics.arcade.overlap(this.sp_Bob, this.explosprits, this.collectStar, null, this);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        if (this.cursors.up.isDown) {
            if ((this.count_gamp < 1) && (this.sp_Bob.body.velocity.y > -5) ) {           
                this.sp_Bob.body.velocity.y = -300;

                this.count_gamp = this.count_gamp + 1;

            } if (is_collide) {
                this.count_gamp = 0;
                this.sp_Bob.body.velocity.y = -300;
            }
        }       
        else  if (this.cursors.left.isDown) {
            
            
            this.sp_Bob.anchor.setTo(0.5, 0);
            this.sp_Bob.scale.x = -1;
            this.sp_Bob.scale.y = 1;
            //this.sp_Bob.scale.setTo(0.5, 0.5);

            this.sp_Bob.body.velocity.x = -300;
            this.sp_Bob.animations.play('walk', 8, true);
        }
        else if (this.cursors.right.isDown) {

            this.sp_Bob.anchor.setTo(0.5, 0);
            this.sp_Bob.scale.x = 1;
            this.sp_Bob.scale.y = 1;

            this.sp_Bob.body.velocity.x = 300;
            this.sp_Bob.animations.play('walk', 8, true);
            
        }
        else {
            this.sp_Bob.body.velocity.x = 0;
            this.sp_Bob.animations.stop('walk',true);

        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.sp_Bob.body.touching.down) {
            //this.sp_Bob.body.velocity.y = -350;
        }



        
    }


    collectStar(sp_Bob, explosprit) {
        
        explosprit.kill();
        this.score += 1;
    }

}

window.onload = () => {

    var game = new SimpleGame();



};
