var preLoadState = {
	preload: function(){
		time = game.time.now;
		loadingBar = game.add.sprite(game.width/2, game.height/2, 'loadingBar');
		loadingBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(loadingBar);
		var loadingImage = game.add.sprite(game.width/2, game.height/2 - loadingBar.height, 'loadingText');
		loadingImage.anchor.setTo(0.5, 0.5);
		
		//images
		game.load.image('plus', 'assets/powerups/plus.png');	
		game.load.image('background', 'assets/background.png');
		game.load.image('bullet', 'assets/ship/bullet.png');		
		game.load.image('title', 'assets/buttons/title.png');
		game.load.image('howto', 'assets/title/howto.png');
		game.load.image('howtoplay', 'assets/title/howtoplay.png');
		game.load.image('debug', 'assets/buttons/debug.png');
		game.load.image('easy', 'assets/buttons/easy_difficulty.png');
		game.load.image('medium', 'assets/buttons/medium_difficulty.png');
		game.load.image('hard', 'assets/buttons/hard_difficulty.png');
		game.load.image('insane', 'assets/buttons/insane_difficulty.png');
		game.load.image('playagain', 'assets/buttons/play_again.png');
		game.load.image('backButton', 'assets/buttons/back.png');

		//spritesheets
		game.load.spritesheet('ship', 'assets/ship/spaceShipSheet.png',88,78,3);
		game.load.spritesheet('soundEnableDisable', 'assets/buttons/enableSound.png',150,150,2);
		game.load.spritesheet('explosion', 'assets/ship/explosion.png',64,64, 16);
		game.load.atlasJSONHash('asteroids', 'assets/asteroids/asteroids.png', 'assets/asteroids/asteroids.json');

		//audio
		game.load.audio('rocketSound', "assets/sound/rocket.mp3");
		game.load.audio('blast', "assets/sound/blast.mp3");		
		game.load.audio('pew', 'assets/sound/pew.mp3');
		game.load.audio('theme', 'assets/sound/theme.mp3');
	},

	create: function(){		
		game.state.start('title');
	}
};