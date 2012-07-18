ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
  
  //Plugins
  	'plugins.impact-splash-loader',

  	/*
	* More info on director here: https://github.com/boneheadmed/Director/blob/master/README.md
	*
	* Looks like a really easy way to change levels, we could probably use it for a million other things too, like 'completed level' screens and shit
  	*/

  	'plugins.director',
  
  //Entities
	'game.entities.crab',
	'game.entities.text',
	'game.entities.hud',
	'game.entities.clickable',
  
  //Levels
	'game.levels.level'
	//'game.levels.menu',
	//'game.levels.level1'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	//How far the titleimage should drop, on the main menu
	drop: 50,
	titleImageX:-30,
	gravity:300,
	
	
	init: function() {
		//Binding keys

		//Arrow Keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');

		//Shoot
		ig.input.bind( ig.KEY.SPACE, 'shoot');

		//Mouse
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		//Load level
		
		/*
		*	This is the new way to load levels - we could put an array of levels here and then do stuff like
		*	this.director.nextLevel();
		*/ 

		this.director = new ig.Director(this, [LevelLevel]);

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 400, 304, 2, ig.ImpactSplashLoader );

});
