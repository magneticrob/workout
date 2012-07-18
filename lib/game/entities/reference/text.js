ig.module (
	'game.entities.text'
)
.requires (
	'impact.entity'
)
.defines(function() {

EntityText = ig.Entity.extend({

	size: {x:24, y:24},
	font: new ig.Font( 'media/04b03.font.png' ),

	//The higher the waviness, the more wavy the text will be. Lower numbers give you more frantic waviness.
	waviness: 5,

	//This is overwritten if it's been set in weltmeister
	word: 'default value',

	init: function( x, y, settings) {
		this.parent( x, y, settings);	
		this.xPos = x,
		this.yPos = y + 20;

		/*
		 * Check if we've set any variables in weltmeister
		 */
		 
		 if(this.textvalue) {
		 	this.word = this.textvalue;
		 }

		 if(this.wavy) {
		 	this.waviness = this.wavy;
		 }
		
		/*
		 * Centering the word based on the length
		 */
		this.pixelLength = this.word.length * 5;
		this.xPos = this.xPos - this.pixelLength / 2;

		/*
		 * Build arrays
		 * 
		 * this.direction - each letter has a status, up or down. this array holds the status of each letter
		 * this.positions - holds the y position of each letter
		 */
		 
		this.direction = new Array();
		this.positions = new Array();
		for(i = 0; i< this.word.length; i++) {
		  this.direction.push('up');
		  this.positions.push(this.yPos - i);
		}		
	},

	update: function() {
		 /*
	     * Text changes direction based on this.direction, which defaults to 'up'
	     * 
	     * 'up' is changed to 'down' when the text gets to a certain point. 
	     */
	     var i = 0;
	     for(i=0; i<this.positions.length;i++) {
	    		if(this.direction[i] == 'down') {
	    			this.positions[i]++;
	    			if(this.positions[i] == this.yPos - this.word.length + this.waviness) {
	    				this.direction[i] = 'up';
	    			}
	    		}
	    		if (this.direction[i] == 'up') {
	    			this.positions[i]--;
	    			if(this.positions[i] == this.yPos - this.word.length - this.waviness) {
	    				this.direction[i] = 'down';
	    			}
	    		}
	     }
		this.parent();
	},

	draw:function() {
		var pos = 0;
		
		for (i = 0; i < this.word.length; i++) {
		    this.font.draw(this.word.charAt(i), this.xPos - pos, this.positions[i], ig.Font.ALIGN.CENTER);
		    pos -= 5;
		}				
	}

});

});