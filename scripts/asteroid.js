asteroid = {	
	create: function(n){
		for (var i = 0; i < n; i++) {
			var xy = this.checkSpawn();
			if((Math.round(Math.random()*3)+1) == 1)	var ast = asteroids.create(xy[0], xy[1], 'asteroid_big');
			else	var ast = asteroids.create(xy[0], xy[1], 'asteroid_small');
			ast.body.acceleration.set(max_acceleration);	
			ast.body.setSize(ast.width*0.80, ast.height*0.8, ast.width*0.1, ast.height*0.1);
			ast.body.maxVelocity.set(50*difficulty);
		}
	},

	checkSpawn: function(){		
		var x = Math.round(Math.random()*game.width)+1;		// the asteroid is not in the rockets vicinity.
		var y = Math.round(Math.random()*game.height)+1;
		if (light > 450) bounds = 400;
		else bounds = light;
		while (Phaser.Math.distanceRounded(x, y, player.x, player.y) <= bounds*0.75){
			x = Math.round(Math.random()*game.width)+1;
			y = Math.round(Math.random()*game.height)+1;
		}
		return [x, y];
	}
}