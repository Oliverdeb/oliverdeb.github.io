titleState = {		
	create: function(){
		theme            = game.add.sound('theme', 0.5, true);
		debugMode        = false;
		theme.play();
		var gameTitle    = game.add.button(game.width/2, game.height/3, 'title', this.playClicked, this);
		var debugButton  = game.add.button(game.width, game.height, 'debug',  this.playDebug, this);
		debugButton.anchor.setTo(1, 1);
		gameTitle.anchor.setTo(0.5, 0.5);
		var howTo        = game.add.sprite(gameTitle.x, gameTitle.y + gameTitle.height, 'howto');
		howTo.anchor.set(0.5, 0.5);
		var instructions = game.add.sprite(howTo.x, howTo.y + 2*(howTo.height), 'howtoplay');
		instructions.anchor.set(0.5, 0.5);
		var enterKey     = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.playClicked, this);
	},

	playClicked: function(){		
		game.state.start('difficulty');
	},

	playDebug: function(){
		debugMode = true;
		game.state.start('difficulty');
	}

	
}