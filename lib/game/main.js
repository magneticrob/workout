ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.entity',
	'impact.collision-map',
	'impact.background-map',
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
	'game.entities.paddle',
	'game.entities.ball',
	'game.entities.brick',
	'game.entities.hud',
  
  //Levels
	'game.levels.level'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	
	init: function() {
		//Binding keys

		//Arrow Keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind( ig.KEY.SPACE, 'shoot');
		ig.input.bind( ig.KEY.ENTER, 'ok');

		//Mouse
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		//Load level
		
		/*
		*	This is the new way to load levels - we could put an array of levels here and then do stuff like
		*	this.director.nextLevel();
		*/ 

		this.director = new ig.Director(this, [LevelLevel]);

		if( !ig.global.wm ) {
			this.paddle = ig.game.getEntitiesByType( EntityPaddle )[0];
		}

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		if(this.paddle.health <= -1) {
			this.gameOver = true;
		}
		if( this.gameOver && ig.input.pressed('ok') ) {
			ig.system.setGame( MyGame );
		}
		if( this.gameOver ) {
			return;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		if( this.gameOver ) {
			this.font.draw( 'Game Over!', ig.system.width/2, 32, ig.Font.ALIGN.CENTER );
			this.font.draw( 'Press Enter', ig.system.width/2, 48, ig.Font.ALIGN.CENTER );
			this.font.draw( 'to Restart', ig.system.width/2, 56, ig.Font.ALIGN.CENTER );
		} else {
			this.parent();
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 400, 304, 2, ig.ImpactSplashLoader );

});
