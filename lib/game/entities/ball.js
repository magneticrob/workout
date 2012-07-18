ig.module (
	'game.entities.ball'
)
.requires (
	'impact.entity'
)
.defines(function() {

EntityBall = ig.Entity.extend({
	
	id:'ball',
	size: {x:50, y:50},
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.ACTIVE,
	animSheet: new ig.AnimationSheet( 'media/ball.png', 50, 50),

	bounciness: 1,
	
	init: function( x, y, settings) {
		this.parent( x, y, settings);

		this.addAnim('idle', 0.1, [0]);
		
		//Got to start it off, or he just stands there
		this.vel.y = 500;
		this.vel.x = 500;
	},

	update: function() {
		this.currentAnim = this.anims.idle;
		this.parent();
	},

	handleMovementTrace: function( res ) { 
		this.parent( res );
		if(res.collision.y && res.pos.y == 190) {
			this.vel.x = 0;
			this.vel.y = 0;
		}
	},

	check: function( other ) {

		//Crude bounce away code
		//other.pos.x = other.pos.x - 10;
		this.vel.x = this.vel.x + 10;
		this.vel.y = this.vel.y + 10;

	}

});

});