gameOverState = {
	create: function(){
		var highScoreText = game.add.text(game.width/2, game.height/3, 'You scored ' + score + ' points!',
		 fontStyle);
		highScoreText.anchor.setTo(0.5, 0.5);

		var playAgainButton = game.add.button(highScoreText.x, highScoreText.y + highScoreText.height, 'playagain', this.playAgain);
		playAgainButton.anchor.setTo(0.5, 0.5);
		var enterKeyPressed = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);		
		enterKeyPressed.onDown.add(this.playAgain, this);
	},

	playAgain: function(){
		bootState.defaultValues();
		game.state.start('title');
	}
};