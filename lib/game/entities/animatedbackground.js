ig.module (
	'game.entities.crab'
)
.requires (
	'impact.entity'
)
.defines(function() {

EntityCrab = ig.Entity.extend({
	
	size: {x:64, y:64},
	type: ig.Entity.TYPE.NONE, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/CrabCH.png', 24, 24),

	init: function( x, y, settings) {
		this.parent( x, y, settings);
		this.addAnim('idle', 0.1, [0]);
	},

	update: function() {
		this.parent();
	}

});

});