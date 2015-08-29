var difficultyState = {
	selectedButton: 0,
	easyButton: null,
	mediumButton: null,
	hardButton: null,
	insaneButton: null,
	scaleDown: false,
	difficultyButtons: null,

	create: function(){
		difficultyButtons = [
			game.add.button(game.width/2, game.height/3.4, 'easy', this.easySelected, this)
		];
	  	difficultyButtons.push(game.add.button(game.width/2, difficultyButtons[0].y + difficultyButtons[0].height*2, 'medium', this.mediumSelected, this));
		difficultyButtons.push(game.add.button(game.width/2, difficultyButtons[1].y + difficultyButtons[1].height*2, 'hard', this.hardSelected, this));
		difficultyButtons.push(game.add.button(game.width/2, difficultyButtons[2].y + difficultyButtons[2].height*2, 'insane', this.insaneSelected, this));
		
		for (var i in difficultyButtons){			
			difficultyButtons[i].anchor.setTo(0.5, 0.5);
		};
		enterKeyPressed = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		difficultyUpSelection = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		difficultyDownSelection = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		enterKeyPressed.onDown.add(this.enterPressed, this);
		difficultyUpSelection.onDown.add(this.upPressed, this);
		difficultyDownSelection.onDown.add(this.downPressed, this);
	},

	enterPressed: function(){
		difficulty = this.selectedButton + 1;
	},

	upPressed: function(){
		if(this.selectedButton > 0){
			this.reset(difficultyButtons[this.selectedButton]);
			this.selectedButton--;
		}
	},

	downPressed: function(){
		if(this.selectedButton < 3) {
			this.reset(difficultyButtons[this.selectedButton]);
			this.selectedButton++;
		}
	},

	reset: function(button){
		button.scale.x = 1;
		button.scale.y = 1;
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

		if(this.scaleDown){
			difficultyButtons[this.selectedButton].scale.x -= 0.01;
			difficultyButtons[this.selectedButton].scale.y -= 0.01;
			if(difficultyButtons[this.selectedButton].scale.x < 1) this.scaleDown = false;
		}else{
			difficultyButtons[this.selectedButton].scale.x += 0.01;
			difficultyButtons[this.selectedButton].scale.y += 0.01;
			if(difficultyButtons[this.selectedButton].scale.x > 1.3) this.scaleDown = true;
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