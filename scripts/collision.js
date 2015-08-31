var collide = {	

	shipAsteroid: function(){
		if(!soundMuted)	{
			blast.play();
			theme.pause();
			rocketSound.pause();
		}
		this.explodeAnimation();		
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
		this.explodeAnimation();	
	},

	explodeAnimation: function(){
		gameover = true;
		time = game.time.now + 2000;	
		player.kill();
		var explosionAnim = game.add.sprite(player.x, player.y, 'explosion');
		explosionAnim.scale.x = 1.5;
		explosionAnim.scale.y = 1.5;
		explosionAnim.anchor.setTo(0.5, 0.5);
		explosionAnim.animations.add('explode');
		explosionAnim.play('explode', 15, false, true);	
	}
};