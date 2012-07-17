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
	animSheet: new ig.AnimationSheet( 'media/CrabCH.png', 384, 48),
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
			this.crab = ig.game.getEntitiesByType( EntityCrab )[0];
			this.crabHunter = ig.game.getEntitiesByType( EntityCrabhunter )[0];
		}			
	},

	draw:function() {

		//This all has to be out of weltmeister too - wondering whether or not this really needs to be an entity.
		if( !ig.global.wm ) {
			
			//Crab info

			if(this.crab) {
				//this.font.draw('CRAB INFO', this.pos.x + 10, this.pos.y + 5, ig.Font.ALIGN.LEFT);
				this.font.draw('X:' + Math.round(this.crab.pos.x), this.pos.x + 10, this.pos.y + 20, ig.Font.ALIGN.LEFT);
				this.font.draw('Y:' + Math.round(this.crab.pos.y), this.pos.x + 10, this.pos.y + 30, ig.Font.ALIGN.LEFT);
				this.font.draw('Health:' + Math.round(this.crab.health), this.pos.x + 10, this.pos.y + 40, ig.Font.ALIGN.LEFT);				
			} else {
				this.font.draw('DEAD.', this.pos.x + 10, this.pos.y + 20, ig.Font.ALIGN.LEFT);				
			}

			//Crabhunter

			if(this.crabHunter){ 
				this.font.draw('X:' + Math.round(this.crabHunter.pos.x), this.pos.x + 128, this.pos.y + 20, ig.Font.ALIGN.LEFT);
				this.font.draw('Y:' + Math.round(this.crabHunter.pos.y), this.pos.x + 128, this.pos.y + 30, ig.Font.ALIGN.LEFT);
				this.font.draw('Health:' + Math.round(this.crabHunter.health), this.pos.x + 128, this.pos.y + 40, ig.Font.ALIGN.LEFT);
				this.font.draw('Direction: ' + this.crabHunter.direction, this.pos.x + 190, this.pos.y + 20, ig.Font.ALIGN.LEFT);
			} else {
				this.font.draw('DEAD.', this.pos.x + 128, this.pos.y + 20, ig.Font.ALIGN.LEFT);
			}
		}
	}	

});



});