ig.module (
	'game.entities.crab'
)
.requires (
	'impact.entity'
)
.defines(function() {

EntityCrab = ig.Entity.extend({
	
	size: {x:24, y:24},

	//Offsetting the hitbox... not sure if this is doing it properly
	offset: {x: 2, y: -4},
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/CrabCH.png', 24, 24),
	
	// Entity specific shit

	health: 50,
	facing: 'down',
	friction: {x: 600, y: 0},
	accelGround: 400, //Crab goes a bit faster when running than when he's jumping
	accelAir: 200,
	jump: 200,

	init: function( x, y, settings) {
		this.parent( x, y, settings);

		this.addAnim('idle', 0.1, [0]);
		this.addAnim('down', 0.1, [0,1,2,3]);		
		this.addAnim('left', 0.1, [4,5,6,7]);						
		this.addAnim('right', 0.1, [8,9,10,11]);	
		this.addAnim('up', 0.1, [12,13,14,15]);			
	},

	update: function() {
		if( ig.input.state('up') ) {
			this.currentAnim = this.anims.up;
			this.facing = 'up';
		}
		else if( ig.input.state('down') ) {
			this.currentAnim = this.anims.down;
			this.facing = 'down';
		}
		else {
			//this.vel.y = 0;
		}

		var accel = this.standing ? this.accelGround : this.accelAir;

		if( ig.input.state('left') ) {
			this.accel.x = -accel;
			this.currentAnim = this.anims.left;
			this.facing = 'left';
		}
		else if( ig.input.state('right') ) {
			this.accel.x = accel;
			this.currentAnim = this.anims.right;
			this.facing = 'right';
		}
		else {
			this.accel.x = 0;
		}

		if( this.standing && ig.input.pressed('jump') ) {
			this.vel.y = -this.jump;
		}

		// shoot
		if( ig.input.pressed('shoot') ) {

			/*
				Here I'm spawning the claw. 

				Notice how the last parameter is an array and you can pass it any shit you like which
				you can then access from inside the claw entity.
			*/
			
			ig.game.spawnEntity( EntityClaw, this.pos.x, this.pos.y,  {flip:this.flip, facing:this.facing} );
		}

		/*
			Arrow keys are no longer movement, they're shoot in a certain direction buttons
		*/

		if( ig.input.pressed('shootup') ) {
			ig.game.spawnEntity( EntityClaw, this.pos.x, this.pos.y,  {flip:this.flip, facing:'up' });
		}
		if( ig.input.pressed('shootdown') ) {
			ig.game.spawnEntity( EntityClaw, this.pos.x, this.pos.y,  {flip:this.flip, facing:'down' });
		}
		if( ig.input.pressed('shootleft') ) {
			ig.game.spawnEntity( EntityClaw, this.pos.x, this.pos.y,  {flip:this.flip, facing:'left' });
		}
		if( ig.input.pressed('shootright') ) {
			ig.game.spawnEntity( EntityClaw, this.pos.x, this.pos.y,  {flip:this.flip, facing:'right' });
		}


		if(this.vel.y == 0 && this.vel.x == 0) {
			this.currentAnim = this.anims.idle;
		}
		var pp = this.pos.x - ig.game.screen.x;

       if( pp > ig.system.width || pp<0){
            this.kill();
            console.log("knocked out of range.")
        }

		this.parent();
	}

});

EntityClaw = ig.Entity.extend({

	size:{x: 11, y: 7},
	offset:{x:0, y:0},
	maxVel: {x: 700, y: 700},
	shotLifetime:1,
	bounciness:0.6,

	type:ig.Entity.TYPE.NONE,
	checkAgainst:ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet( 'media/claw.png', 11, 7 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.shotTimer = new ig.Timer();

		// Shoot the crab claw out of the right place, and also give it a bit of offset

		switch (this.facing) {
			case 'up':
				this.vel.y = -700;
			break;

			case 'down':
				this.vel.y = 700;
				this.offset.x = -14;
				this.offset.y = 2;
			break;

			case 'left':
				this.vel.x = -700;
				break;

			case 'right':
				this.vel.x = 700;
				this.offset.y = -14;
				break;
		}

		this.addAnim( 'idle', 2, [0] );
	},

	handleMovementTrace: function( res ) {
		this.parent( res );

		if(this.shotTimer.delta() > this.shotLifetime) {
			this.kill();
		}
	},

	check: function( other ) {
		other.receiveDamage( 1, this );
		this.kill();
	}	



})

});