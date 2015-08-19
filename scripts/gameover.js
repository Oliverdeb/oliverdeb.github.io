gameOverState = {
	create: function(){
		var highScoreText = game.add.text(game.width/2, game.height/3, 'You scored ' + score + ' points!',
		 {font: '32px Arial', fill: '#fff'});
		highScoreText.anchor.setTo(0.5, 0.5);

		var playAgainButton = game.add.button(highScoreText.x, highScoreText.y + highScoreText.height, 'playagain', this.playAgain);
		playAgainButton.anchor.setTo(0.5, 0.5);
	},

	playAgain: function(){
		bootState.defaultValues();
		game.state.start('title');
	}
};