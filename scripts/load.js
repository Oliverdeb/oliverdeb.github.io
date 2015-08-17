var preLoadState = {
	preload: function(){
		time = game.time.now;
		loadingBar = game.add.sprite(game.width/2 - game.cache.getImage('loadingBar').width/2, game.height/2, 'loadingBar');
		//loadingBar.
		game.load.setPreloadSprite(loadingBar);
		var loadingImage = game.add.sprite(game.width/2 - game.cache.getImage('loadingText').width/2, game.height/2 - loadingBar.height, 'loadingText');

		game.load.image('plus', 'assets/plus.png');	
		game.load.image('background', 'assets/starBackground.png');
		game.load.image('asteroid_big', 'assets/meteorBig.png');
		game.load.image('asteroid_small', 'assets/meteorSmall.png');    
		game.load.image('bullet', 'assets/bullet.png');		
		game.load.image('title', 'assets/title.png');
		game.load.image('howto', 'assets/howto.png');
		game.load.image('howtoplay', 'assets/howtoplay.png');
		game.load.spritesheet('space_ship', 'assets/player.png',100,100,4);
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