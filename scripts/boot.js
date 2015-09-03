var bootState = {
	preload: function(){
		// loading the "loading" images for the next game state, to have 
		// bars and text.			
		soundMuted         = false;
		this.defaultValues();		
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
	},

	defaultValues: function(){
		amountOfAnimationUpdates = 0;
		gameover                 = false;
		render                   = true;
		debugMode                = false;
		drag                     = 50;
		bulletTime               = 0;	
		difficulty               = -1;
		max_pickups              = 0;
		powerup_bonus_ammo       = 0;
		powerup_bonus_life       = 0;
		max_velocity             = 0;
		max_asteroids            = 0;
		ammo                     = 0;
		max_acceleration         = 0;
		circleDecreaseAmt        = 0;
		circleRadius                    = 0;
		max_circleRadius                = game.width;
		score                    = 0;
		lastBulletTime           = 0;
		fontStyle                = {font: '32px Arial', fill: '#fff'};
	}
};