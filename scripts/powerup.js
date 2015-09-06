powerup = {
	createPowerup: function(n){
		for(i = 0; i < n; i++){
			var xy = this.checkSpawn();
			var plusPowerup = powerups.create(xy[0], xy[1], 'plus');
			game.physics.arcade.enable(plusPowerup);
			plusPowerup.scale.setTo(1.5, 1.5);
		}		
	},

	respawn: function(sprite){
		var xy = asteroid.checkSpawn();
		sprite.x = xy[0];
		sprite.y = xy[1];
	},

	checkSpawn: function(){		
		var x = game.world.randomX;
		var y = game.world.randomY;
		if (circleRadius > 450) bounds = 400;
		else bounds = circleRadius;
		while (Math.round(Phaser.Math.distance(x, y, player.x, player.y)) <= bounds * .45){
			x = game.world.randomX;
			y = game.world.randomY;
		}
		return [x, y];
	},
	//,

	/*checkAsteroids: function(){
		var x = Math.round(Math.random()*game.width)+1;		
		var y = Math.round(Math.random()*game.height)+1;
		if (circleRadius > 450) bounds = 450;
		else bounds = circleRadius;
		while (Phaser.Math.distanceRounded(x, y, player.x, player.y) <= circleRadius*0.75){
			x = Math.round(Math.random()*game.width)+1;
			y = Math.round(Math.random()*game.height)+1;
		}
	}*/
}
