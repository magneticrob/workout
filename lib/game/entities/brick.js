ig.module (
	'game.entities.brick'
)
.requires (
	'impact.entity'
)
.defines(function() {

	EntityBrick = ig.Entity.extend({
		
		size: {x:24, y:24},

		//Offsetting the hitbox... not sure if this is doing it properly
		offset: {x: 0, y: 0},
		type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.FIXED,
		animSheet: new ig.AnimationSheet( 'media/brick.png', 24, 24),
		
		// Entity specific shit

		init: function( x, y, settings) {
			this.parent( x, y, settings);

			this.addAnim('idle', 0.1, [0]);
			this.addAnim('death', 0.05, [1,2]);
		},

		update: function() {

			// shoot
			if( ig.input.pressed('shoot') ) {

				/*
					Here I'm spawning the claw. 

					Notice how the last parameter is an array and you can pass it any shit you like which
					you can then access from inside the claw entity.
				*/
				
				//ig.game.spawnEntity( EntityClaw, this.pos.x, this.pos.y,  {flip:this.flip, facing:this.facing} );
			}
			if(this.deathTimer) {
				if(this.deathTimer.delta() > 0.5) {
					this.kill();
				}
			}
			this.parent();
		},

		check: function( other ) {
			if(other.touches(this)) {
				
			//	other.vel.x = other.vel.x - 300;
			//	other.vel.y = other.vel.y + 300;
			}
			this.currentAnim = this.anims.death;
			this.deathTimer = new ig.Timer();
		}

	});

});