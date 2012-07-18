ig.module (
	'game.entities.crabhunter'
)
.requires (
	'impact.entity'
)
.defines(function() {

EntityCrabhunter = ig.Entity.extend({
	
	id:'crabhunter',
	size: {x:40, y:64},
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.ACTIVE,
	animSheet: new ig.AnimationSheet( 'media/crabhunter.png', 40, 64),

	bounciness: 0.7,
	health: 10,
	flip: false,
	changeDirectionAfter: 0.1,
	
	init: function( x, y, settings) {
		this.parent( x, y, settings);

		this.addAnim('idle', 0.1, [0]);
		this.addAnim('walking', 0.1, [0,1,2,3]);
		this.changeDirectionTimer = new ig.Timer(this.changeDirectionAfter);

		//Got to start him off, or he just stands there
		this.vel.y = 100;

		this.directions = 
		[
		 "up", 
		 "down", 
		 "left", 
		 "right"
		]

	},

	update: function() {

		if(this.changeDirectionTimer.delta() > 0) {
			this.direction = this.directions[Math.floor(Math.random()*this.directions.length)]
			this.changeDirectionTimer.set( this.changeDirectionAfter );
		}

		if( this.direction == 'up' ) {
			this.vel.y = -100;
		}
		else if( this.direction == 'down' ) {
			this.vel.y = 100;
		}

		if( this.direction == 'left' ) {
			this.vel.x = -100;
			this.currentAnim = this.anims.walking;
			this.flip = true;
		}
		else if( this.direction == 'right' ) {
			this.vel.x = 100;
			this.currentAnim = this.anims.walking;
			this.flip = false;
		}

		if(this.vel.y == 0 && this.vel.x == 0) {
			this.currentAnim = this.anims.idle;
		}

		this.currentAnim.flip.x = this.flip;

		this.parent();
	},

	check: function( other ) {

		//Crude bounce away code
		other.pos.x = other.pos.x - 10;
		other.pos.y = other.pos.y + 10;

		//Damage player
		other.receiveDamage( 1, this );
	}

});

});