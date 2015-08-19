collide = {
	shipAsteroid: function(){
		blast.play();
		theme.pause();
		gameover = true;
		time = game.time.now + 2000;
		player.animations.play('explosion', 20, true);
		rocketSound.pause();
	},

	shipPowerup: function(){
		score += 50;
		ammo += powerup_bonus_ammo;
		if(light < max_light) light += powerup_bonus_life;
		powerups.forEachExists(powerup.respawn, this);
	},

	bulletPowerup: function(bullet){
		score += 50;
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
		blast.play();
		gameover = true;
		time = game.time.now + 2000;
		player.animations.play('explosion', 20, true);
		rocketSound.pause();
	}
}