titleState = {	
	create: function(){
		console.log("switched states");
		var gameTitle = game.add.button(game.width/2, game.height/2, 'title', this.playClicked, this);
		gameTitle.anchor.setTo(0.5, 0.5);
		var howTo = game.add.sprite(gameTitle.x, gameTitle.y + gameTitle.height, 'howto');
		howTo.anchor.set(0.5, 0.5);
		var instructions = game.add.sprite(howTo.x, howTo.y + 2*(howTo.height), 'howtoplay');
		instructions.anchor.set(0.5, 0.5);
		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.playClicked, this);
	},

	playClicked: function(){
		console.log("clicked");
		//game.state.start('start')
	}
}