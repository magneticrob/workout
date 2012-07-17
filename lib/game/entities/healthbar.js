ig.module (
	'game.entities.healthbar'
)
.requires (
	'impact.entity'
)
.defines(function() {

EntityHealthbar = ig.Entity.extend({
	
	size: {x:96, y:2},
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	animSheet: new ig.AnimationSheet( 'media/healthbar.png', 96, 2),
	gravityFactor:0,

	init: function( x, y, settings) {
		this.parent( x, y, settings);

		//The variable should be set in weltmeister, and is this.entity
		if( !ig.global.wm && this.entity ) {
			this.entityObject = ig.game.getEntitiesByType( this.entity )[0];
			if(!this.entityObject.health) {
				console.log('invalid entity');
			}

			//If theres a better way of doing this, let me know...
			this.quartiles = [
								Math.round(this.entityObject.health / 4),
								Math.round(this.entityObject.health / 4 * 2),
								Math.round(this.entityObject.health / 4 * 3),
								Math.round(this.entityObject.health / 4 * 4)
							 ]
		
		} else if (!this.entity ) {
			console.log('no entity set in weltmeister');
		}

		this.addAnim('full', 1, [4]);
		this.addAnim('notsofull', 1, [3]);		
		this.addAnim('worrying', 1, [2]);
		this.addAnim('nearlyempty', 1, [1]);
		this.addAnim('death', 1, [0]);

	},

	update: function() {
		this.parent();
		if( !ig.global.wm ) {
			if(this.entityObject.health == this.quartiles[0]){
				this.currentAnim = this.anims.nearlyempty;
			} else if(this.entityObject.health == this.quartiles[1]) {
				this.currentAnim = this.anims.worrying;
			} else if(this.entityObject.health == this.quartiles[2]) {
				this.currentAnim = this.anims.notsofull;
			}else if (this.entityObject.health == this.quartiles[3]) {
				this.currentAnim = this.anims.full;
			} else if (this.entityObject.health == 0) {
				this.currentAnim = this.anims.death;
			}
		}

	}

});

});