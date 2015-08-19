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
		game.load.image('background', 'assets/starBackground.png');
		game.load.image('asteroid_big', 'assets/meteors/meteorBig.png');
		game.load.image('asteroid_small', 'assets/meteors/meteorSmall.png');    
		game.load.image('bullet', 'assets/ship/bullet.png');		
		game.load.image('title', 'assets/buttons/title.png');
		game.load.image('howto', 'assets/title/howto.png');
		game.load.image('howtoplay', 'assets/title/howtoplay.png');
		game.load.image('debug', 'assets/buttons/debug.png');
		game.load.image('easy', 'assets/buttons/easy_difficulty.png');
		game.load.image('medium', 'assets/buttons/medium_difficulty.png');
		game.load.image('hard', 'assets/buttons/hard_difficulty.png');
		game.load.image('insane', 'assets/buttons/insane_difficulty.png');

		//spritesheets
		game.load.spritesheet('space_ship', 'assets/ship/player.png',100,100,4);

		//audio
		game.load.audio('audio', "assets/sound/rocket.mp3");
		game.load.audio('blast', "assets/sound/blast.mp3");
		game.load.audio('end', "assets/sound/end.mp3");
		game.load.audio('pew', 'assets/sound/pew.mp3');
		game.load.audio('theme', 'assets/sound/theme.mp3');
	},

	create: function(){		
		game.state.start('title');
	}
};