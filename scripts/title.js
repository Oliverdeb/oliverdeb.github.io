titleState = {		
	create: function(){
		theme            = game.add.sound('theme', 0.5, true);
		var soundButton  = game.add.button(game.width, 0, 'soundEnableDisable', this.soundClicked, soundButton);
		if(soundMuted) {
			soundButton.frame = 1;
			theme.play(); 
			theme.pause();
		}else theme.play();
		
		soundButton.anchor.setTo(1.1, -0.1);
		soundButton.scale.setTo(0.5, 0.5);		
		
		var gameTitle    = game.add.button(game.width/2, game.height/3, 'title', this.playClicked, this);
		var debugButton  = game.add.button(game.width, game.height, 'debug',  this.playDebug, this);
		debugButton.anchor.setTo(1.1, 1.1);
		gameTitle.anchor.setTo(0.5, 0.5);
		var howTo        = game.add.sprite(gameTitle.x, gameTitle.y + gameTitle.height, 'howto');
		howTo.anchor.set(0.5, 0.5);
		var instructions = game.add.sprite(howTo.x, howTo.y + howTo.height*2, 'howtoplay');
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
	},

	soundClicked: function(soundButton){
		if(!soundMuted){		
			theme.pause();	
			soundButton.frame = 1;
			soundMuted = true;			
		}else{
			theme.resume();
			soundButton.frame = 0;
			soundMuted = false;
		}	
	}	
}