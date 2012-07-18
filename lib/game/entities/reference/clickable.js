ig.module (
	'game.entities.clickable'
)
.requires (
	'impact.game',	
	'impact.entity',
	'plugins.director'
)
.defines(function() {

EntityClickable = ig.Entity.extend({

	type: ig.Entity.TYPE.B,
	size: {x: 100, y:20},
	font: new ig.Font( 'media/04b03.font.png' ),
	clickStatus: false,
	gravityFactor: 0,

	clicked: function( x, y, settings) {
		this.clickStatus = true;	
	},

	draw: function() {
		if(!this.text) {
			this.text = 'default';
		}
		this.font.draw( this.text, this.pos.x + 45, this.pos.y + 10, ig.Font.ALIGN.CENTER);
	},

	hovered: function() {
		this.font = new ig.Font( 'media/04b03.fontGreen.png' );
	},

	unhover: function() {
		this.font = new ig.Font( 'media/04b03.font.png' );
	}
})

EntityPointer = ig.Entity.extend({
	
	size: {x:2, y:2},
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.B, //Check against menu items
	animSheet: new ig.AnimationSheet( 'media/pointer.png', 2, 2),
	isClicking: false,

	init: function( x, y, settings) {
		this.parent( x, y, settings);
		//Start capturing mouse events
		ig.input.initMouse();
		this.addAnim('idle', 1, [0]);
	},

	update: function() {
		this.parent();
		
		//On update, the pointer entity updates itself to the mouse position
		this.pos.x = ig.input.mouse.x;
		this.pos.y = ig.input.mouse.y;

		// Only check for the click once per frame, instead of
        // for each entity it touches in the 'check' function
        this.isClicking = ig.input.state('click');

        //We're unhovered here, so lets undo everything we set when we set the hover styles
        this.buttons = ig.game.getEntitiesByType( 'EntityClickable' );

        for (i=1;i<=this.buttons.length;i++) {
	        this.buttons[i-1].font = new ig.Font( 'media/04b03.font.png' );	
        }
	},

	check: function( other ) {
        
        other.hovered();

        // User is clicking and the 'other' entity has 
        // a 'clicked' function?
        if( this.isClicking && typeof(other.clicked) == 'function' ) {
            other.clicked();
        }
	}

});

});