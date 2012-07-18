ig.module (
	'game.entities.hero'
)
.requires (
	'impact.hero-entity'
)
.defines(function() {

EntityHero = ig.Entity.extend({

	
	size: {x:68, y:77},
	collides: ig.Entity.COLLIDES.ACTIVE,
	animSheet: new ig.AnimationSheet( 'media/Male Heavy Armour.png', 68, 77,"../impactgame/media/Male Heavy Armour.xml"),

	

	init: function( x, y, settings) {
		this.parent( x, y, settings);

		this.addAnim('idle', 0.1, [24,25,26,27]);
		this.addAnim('down', 0.1, [62,63,64,65,66,67]);		
		this.addAnim('left', 0.1, [4,5,6,7]);						
		this.addAnim('right', 0.1, [8,9,10,11]);	
		this.addAnim('up', 0.1, [12,13,14,15]);			
	},

	update: function() {
		if( ig.input.state('up') ) {
			this.vel.y = -100;
			this.currentAnim = this.anims.up;
		}
		else if( ig.input.state('down') ) {
			this.vel.y = 100;
			this.currentAnim = this.anims.down;
		}
		else {
			this.vel.y = 0;
		}

		if( ig.input.state('left') ) {
			this.vel.x = -100;
			this.currentAnim = this.anims.left;
		}
		else if( ig.input.state('right') ) {
			this.vel.x = 100;
			this.currentAnim = this.anims.right;
		}
		else {
			this.vel.x = 0;
		}

		if(this.vel.y == 0 && this.vel.x == 0) {
			this.currentAnim = this.anims.idle;
		}

		this.parent();
	}

});

});