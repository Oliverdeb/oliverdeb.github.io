var bootState = {
	preload: function(){
		// loading the "loading" images for the next game state, to have 
		// bars and text.
		gameover          = false;
		render            = true;
		debugMode         = false;
		drag              = 50;
		bulletTime        = 0;	
		keyboard_down     = false;
		difficulty        = -1;
		max_pickups       = 0;
		pickup_bonus_ammo = 0;
		pickup_bonus_life = 0;
		max_velocity      = 0;
		max_asteroids     = 0;
		ammo              = 0;
		max_acceleration  = 0;
		difference        = 0;
		light             = 0;

		
		game.load.image("loadingBar", "assets/title/loadbar.png");
		game.load.image("loadingText", "assets/title/loadingText.png");
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