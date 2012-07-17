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
	*
  	*/

  	'plugins.director',
  
  //Entities
	'game.entities.crab',
	'game.entities.text',
	'game.entities.hud',
	'game.entities.clickable',
  
  //Levels
	'game.levels.level',
	'game.levels.menu',
	'game.levels.level1'
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
		ig.input.bind( ig.KEY.UP_ARROW, 'shootup');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'shootdown');
		ig.input.bind( ig.KEY.LEFT_ARROW, 'shootleft');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'shootright');

		//WASD cos obv
		ig.input.bind( ig.KEY.W, 'up');
		ig.input.bind( ig.KEY.S, 'down');
		ig.input.bind( ig.KEY.A, 'left');
		ig.input.bind( ig.KEY.D, 'right');

		//Shoot
		ig.input.bind( ig.KEY.SPACE, 'jump');

		//Mouse
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		//Load level
		
		/*
		*	This is the new way to load levels - we could put an array of levels here and then do stuff like
		*	this.director.nextLevel();
		*/ 

		this.director = new ig.Director(this, [LevelMenu, LevelLevel, LevelLevel1]);

		//If we're on the menu
		if(this.director.currentLevel == 0) {
			//Spawn the pointer
			ig.game.spawnEntity( EntityPointer, 0, 0 );

			//Load the title image
			this.titleImage = new ig.Image( 'media/gametitle.png' );
		}
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		//Handles the menu buttons.
		if(this.director.currentLevel == 0) {
			//This is poor. there must be a better way of doing this.
			this.startButton = ig.game.getEntitiesByType( EntityClickable )[0];
			this.otherButton = ig.game.getEntitiesByType( EntityClickable )[1];

			if(this.startButton && this.startButton.clickStatus == true) {
				this.director.nextLevel();
			}
			if(this.otherButton && this.otherButton.clickStatus == true) {
				//console.log('otherbutton clicked');
				this.director.jumpTo(LevelLevel1);
			}		

			if(this.titleImageX < this.drop) {
				this.titleImageX++;
			}
		}

		if(this.director.currentLevel == 2) {
			// screen follows the player
			var player = this.getEntitiesByType( EntityCrab )[0];
			if( player ) {
				this.screen.x = player.pos.x - ig.system.width/2;
				//this.screen.y = player.pos.y - ig.system.height/2;
			}
		}

	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		if(this.director.currentLevel == 0) {

			this.titleImage.draw(100,this.titleImageX);
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 400, 304, 2, ig.ImpactSplashLoader );

});
