var collide = {	

	shipAsteroid: function(){
		if(!soundMuted)	{
			blast.play();
			theme.pause();
			rocketSound.pause();
		}
		gameover = true;
		time = game.time.now + 2000;

		console.log("running?here");
		startState.explodeAnimation();
		//player.animations.play('explosion', 20, true);
		
	},

	shipPowerup: function(){			
		score += 50*difficulty;
		scoreCounter.setText("Score: " + score);
		ammo += powerup_bonus_ammo;
		if(light < max_light) light += powerup_bonus_life;
		powerups.forEachExists(powerup.respawn, this);
	},

	bulletPowerup: function(bullet){		
		score += 50*difficulty;
		scoreCounter.setText("Score: " + score);
		ammo += powerup_bonus_ammo;
		if(light < max_light) light += powerup_bonus_life;
		bullet.kill();
		powerups.forEachExists(powerup.respawn, this);
	},

	bulletAsteroid: function(bullet, pAsteroid){
		bullet.kill();
		pAsteroid.kill();
		asteroid.create(1);
	},

	shipBullet: function(player, bullet){
		bullet.kill();
		if(!soundMuted)	{
			blast.play();
			theme.pause();
			rocketSound.pause();
		}
		gameover = true;
		time = game.time.now + 2000;
		startState.explodeAnimation();	
	}
}