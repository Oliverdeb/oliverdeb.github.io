asteroid = {	
	greyAsteroids: [],
	brownAsteroids: [],

	populateAnimationArray: function(){
		for (var i = 1; i < 16; i++) {
			var endPart = i < 10 ? '0' + i: i + '';
			endPart += '.png';
			this.greyAsteroids.push('imgs/a100' + endPart);
			this.brownAsteroids.push('imgs/c400' + endPart);
		};
	},

	create: function(n){
		for (var i = 0; i < n; i++) {
			var xy = this.checkSpawn();
			var greyOrBrown = game.rnd.integerInRange(0, 1)
			if(greyOrBrown == 1)	
			{
				var ast = asteroids.create(xy[0], xy[1], 'asteroids', 'imgs/a10000.png');
				var arrayOfImgs = this.greyAsteroids;

			}else{
				var ast = asteroids.create(xy[0], xy[1], 'asteroids', 'imgs/c40000.png');
				var arrayOfImgs = this.brownAsteroids;
			}				
			var  scaleFactor = game.rnd.realInRange(0.3, 1);
			ast.animations.add('rotate', arrayOfImgs, 0, true, false);	
			ast.body.maxVelocity.set(max_velocity + game.rnd.integerInRange(0, 15));
			ast.scale.setTo(scaleFactor, scaleFactor);
			ast.body.setSize(ast.width*.8, ast.height*.8, ast.width*0.07,  ast.height*0.07);
			ast.body.reset(ast.x + ast.width*0.07, ast.y + ast.height*0.07 );
			ast.body.acceleration.set(max_acceleration + game.rnd.realInRange(0.1, 1));		
			
		}
	},

	//kind of working
	/*//ast.body.setSize(ast.width * .8, ast.height *.85, 0, 0);			
	ast.body.maxVelocity.set(max_velocity + game.rnd.integerInRange(0, 15));
	ast.body.setSize(ast.width*.9, ast.height*.9, ast.width*0.05,  ast.height*0.05);
	ast.body.reset(ast.x + ast.width*0.05, ast.y + ast.height*0.05 );
	ast.body.acceleration.set(max_acceleration + game.rnd.realInRange(0.1, 1));		
	ast.scale.setTo(scaleFactor, scaleFactor);*/

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
		asteroidObj.revive();
		var xy = this.checkSpawn();
		asteroidObj.x = xy[0];
		asteroidObj.y = xy[1];
	}
}