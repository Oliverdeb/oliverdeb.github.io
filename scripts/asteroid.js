asteroid = {	
	create: function(n){
		for (var i = 0; i < n; i++) {
			var xy = this.checkSpawn();
			if(game.rnd.integerInRange(0, 1) == 1)	var ast = asteroids.create(xy[0], xy[1], 'asteroid_big');
			else	var ast = asteroids.create(xy[0], xy[1], 'asteroid_small');
			ast.body.acceleration.set(max_acceleration);	
			ast.body.setSize(ast.width*0.80, ast.height*0.8, ast.width*0.1, ast.height*0.1);
			ast.body.maxVelocity.set(50*difficulty);
		}
	},

	checkSpawn: function(){		
		var x = game.world.randomX;
		var y = game.world.randomY;
		if (light > 450) bounds = 400;
		else bounds = light;
		while (Math.round(Phaser.Math.distance(x, y, player.x, player.y)) <= bounds*0.75){
			x = game.world.randomX;
			y = game.world.randomY;
		}
		return [x, y];
	},

	reviveAsteroid: function(asteroidObj){
		var xy = this.checkSpawn();
		asteroidObj.x = xy[0];
		asteroidObj.y = xy[1];
	}
}