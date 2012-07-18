ig.module (
	'game.entities.paddle'
)
.requires (
	'impact.entity'
)
.defines(function() {

	EntityPaddle = ig.Entity.extend({
		
		size: {x:64, y:7},

		//Offsetting the hitbox... not sure if this is doing it properly
		offset: {x: 0, y: 0},
		type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet( 'media/wopaddle.png', 64, 7),
		
		// Entity specific shit

		friction: {x: 600, y: 0},
		accel: 0,
		jump: 200,

		init: function( x, y, settings) {
			this.parent( x, y, settings);

			this.addAnim('idle', 0.1, [0]);
		},

		update: function() {

			if( ig.input.state('left') ) {
				this.vel.x = -100;
				console.log(this.vel);
			}
			else if( ig.input.state('right') ) {
				this.vel.x = 100;
			}
			else {
				this.vel.x = 0;
			}

			// shoot
			if( ig.input.pressed('shoot') ) {

				/*
					Here I'm spawning the claw. 

					Notice how the last parameter is an array and you can pass it any shit you like which
					you can then access from inside the claw entity.
				*/
				
				//ig.game.spawnEntity( EntityClaw, this.pos.x, this.pos.y,  {flip:this.flip, facing:this.facing} );
			}

			this.parent();
		}

	});

});