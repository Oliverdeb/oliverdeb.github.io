var bootState = {
	preload: function(){
		// loading the "loading" images for the next game state, to have 
		// bars and text.
		game.load.image("loadingBar", "assets/loadbar.png");
		game.load.image("loadingText", "assets/loadingText.png");
		//load other stuff.
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();	
		game.state.start("preLoad");
	}
};