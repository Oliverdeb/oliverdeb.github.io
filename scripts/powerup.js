powerup = {
	createPowerup: function(n){
		for(i = 0; i < n; i++){
			var xy = asteroid.checkSpawn();
			var plusPowerup = powerups.create(xy[0], xy[1], 'plus');
			game.physics.arcade.enable(plusPowerup);
		}		
	},

	respawn: function(sprite){
		var xy = asteroid.checkSpawn();
		sprite.x = xy[0];
		sprite.y = xy[1];
	}
	//,

	/*checkAsteroids: function(){
		var x = Math.round(Math.random()*game.width)+1;		// the asteroid is not in the rockets vicinity.
		var y = Math.round(Math.random()*game.height)+1;
		if (light > 450) bounds = 450;
		else bounds = light;
		while (Phaser.Math.distanceRounded(x, y, player.x, player.y) <= light*0.75){
			x = Math.round(Math.random()*game.width)+1;
			y = Math.round(Math.random()*game.height)+1;
		}
	}*/
}
