ig.module (
	'game.entities.hud'
)
.requires (
	'impact.entity'
)
.defines(function() {

EntityHud = ig.Entity.extend({

	font: new ig.Font( 'media/04b03.font.png' ),
	size: {x:384, y:48},
	collides: ig.Entity.COLLIDES.ACTIVE,
	animSheet: new ig.AnimationSheet( 'media/crabCH.png', 384, 48),
	clawCount: 0,
	
	init: function( x, y, settings) {
		this.parent( x, y, settings);
		this.addAnim('idle', 100, [0]);
	},

	update: function() {
		this.parent();

	    // Do something only when NOT running in Weltmeister
		if( !ig.global.wm ) {
		    /*
		    For some reason weltmeister dies when calling getEntitiesByType on init.
		    Something to do with ig.game being set to something different. 	

		    Having it within this if statement fixes it.
		    */

		    //Get element to monitor
			//this.paddle = ig.game.getEntitiesByType( EntityCrab )[0];
			this.paddle = ig.game.getEntitiesByType( EntityPaddle )[0];
		}			
	},

	draw:function() {

		//This all has to be out of weltmeister too - wondering whether or not this really needs to be an entity.
		if( !ig.global.wm ) {
			
			//paddle info
			
			if(this.paddle) {
				//this.font.draw('paddle INFO', this.pos.x + 10, this.pos.y + 5, ig.Font.ALIGN.LEFT);
				this.font.draw('X:     ' + Math.round(this.paddle.pos.x), this.pos.x + 4, this.pos.y + 3, ig.Font.ALIGN.LEFT);
				this.font.draw('Y:     ' + Math.round(this.paddle.pos.y), this.pos.x + 4, this.pos.y + 13, ig.Font.ALIGN.LEFT);
				this.font.draw('Score: ' + Math.round(this.paddle.score), this.pos.x + 4, this.pos.y + 23, ig.Font.ALIGN.LEFT);		
				this.font.draw('Health: ' + Math.round(this.paddle.health), this.pos.x + 4, this.pos.y + 33, ig.Font.ALIGN.LEFT);			
			} else {
				this.font.draw('DEAD.', this.pos.x + 10, this.pos.y + 20, ig.Font.ALIGN.LEFT);				
			}
			
		}
	}	

});



});