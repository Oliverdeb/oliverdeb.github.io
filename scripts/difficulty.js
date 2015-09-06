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
			game.add.button(game.width/2, game.height/5, 'easy', this.easySelected, this)
		];
	  	difficultyButtons.push(game.add.button(game.width/2, difficultyButtons[0].y + difficultyButtons[0].height*2, 'medium', this.mediumSelected, this));
		difficultyButtons.push(game.add.button(game.width/2, difficultyButtons[1].y + difficultyButtons[1].height*2, 'hard', this.hardSelected, this));
		difficultyButtons.push(game.add.button(game.width/2, difficultyButtons[2].y + difficultyButtons[2].height*2, 'insane', this.insaneSelected, this));
		difficultyButtons.push(game.add.button(game.width/2, difficultyButtons[3].y + difficultyButtons[3].height*2, 'backButton', this.backSelected, this));

		
		for (var i in difficultyButtons){			
			difficultyButtons[i].anchor.setTo(0.5, 0.5);
		};
		var keysPressed = game.input.keyboard.addKeys (
			{
				enter: Phaser.Keyboard.ENTER,
				up: Phaser.Keyboard.UP,
				down: Phaser.Keyboard.DOWN 
			});
		keysPressed.enter.onDown.add(this.enterPressed, this);
		keysPressed.up.onDown.add(this.upPressed, this);
		keysPressed.down.onDown.add(this.downPressed, this);
	},

	enterPressed: function(){
		difficulty = this.selectedButton + 1;
	},

	upPressed: function(){
		this.reset(difficultyButtons[this.selectedButton]);
		if(this.selectedButton > 0){			
			this.selectedButton--;
		}else {
			this.selectedButton = 4;
		}		
	},

	downPressed: function(){
		this.reset(difficultyButtons[this.selectedButton]);
		if(this.selectedButton < 4) {
			this.selectedButton++;
		}else{
			this.selectedButton = 0;
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

	backSelected: function(){
		difficulty = 5;
	},

	update: function(){
		if(difficulty > 0){			
			if(difficulty == 5) {
				difficulty = 0;
				game.state.start('title');
				theme.pause();

			}else{
				this.setDifficulty();
				game.state.start('start');
			}
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
		animationSpeedThreshold     = 3 + (difficulty * 1.5);
		timeBetweenAnimationUpdates = 5000 + (6000 - difficulty * 1000); 
		turnSpeed                   = 200 +  20 * difficulty;
		max_pickups                 = 6 - difficulty;
		powerup_bonus_ammo          = 5 - difficulty;
		powerup_bonus_life          = 300 / difficulty;
		max_velocity                = (50 * difficulty) + 50;		
		player_max_velocity         = max_velocity + (20 * difficulty);
		max_asteroids               = (difficulty * difficulty) + 15
		ammo                        = 5 - difficulty;
		max_acceleration            = difficulty + 1;
		circleDecreaseAmt           = 0.35 + difficulty/40;
		if (difficulty > 2) circleRadius   = 500;
		else circleRadius                  = 650 - (100 * difficulty);
	}
}