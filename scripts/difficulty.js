difficultyState = {
	create: function(){
		var easyButton = game.add.button(game.width/2, game.height/3.4, 'easy', this.easySelected, this);
		var mediumButton = game.add.button(game.width/2, easyButton.y + easyButton.height*2, 'medium', this.mediumSelected, this);
		var hardButton = game.add.button(game.width/2, mediumButton.y + mediumButton.height*2, 'hard', this.hardSelected, this);
		var insaneButton = game.add.button(game.width/2, hardButton.y + hardButton.height*2, 'insane', this.insaneSelected, this);
		easyButton.anchor.setTo(0.5, 0.5);
		mediumButton.anchor.setTo(0.5, 0.5);
		hardButton.anchor.setTo(0.5, 0.5);
		insaneButton.anchor.setTo(0.5, 0.5);
	},

	easySelected: function(){
		difficulty = 1;
	},

	mediumSelected: function(){
		difficulty = 2;
	},

	hardSelected: function(){
		difficulty = 3;
	},

	insaneSelected: function(){
		difficulty = 4;
	},

	update: function(){
		if(difficulty > 0){
			this.setDifficulty();
			game.state.start('start');
		}
	},

	setDifficulty: function(){
		max_pickups       = 5-difficulty;
		powerup_bonus_ammo = 5-difficulty;
		powerup_bonus_life = 300/difficulty;
		max_velocity      = 150+(50*difficulty);
		max_asteroids     = 6 * difficulty;
		ammo              = 5 - difficulty;
		max_acceleration  = difficulty;
		difference        = 0.3 + difficulty/20;
		if (difficulty > 2) light = 300;
		else light = 600 - (100 * difficulty);
	}
}