ig.module(
	'impact.hero-xml'
)
.defines(function(){

ig.HeroXML = ig.Class.extend({
	index: 0,
	xmlDoc: null,

	
	init: function( xmlPath ) {
		//console.log("constructor" + xmlPath);
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET",xmlPath,false);
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;
		this.xmlDoc = xmlDoc;
	}	
});
});



