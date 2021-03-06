asteroid = {	
	greyAsteroids: [],
	brownAsteroids: [],

	/**
	 * Returns an array of images for adding animation based on the random start frame provided.
	 * 
	 * @param  {number} greyOrBrown The colour of the asteroid(1 = grey, 0 = brown).
	 * @param  {number} startImageIndex The image to continue the animation frame from. 
	 * @return {array} arrayOfImgs An array of image names
	 */
	populateAnimationArray: function(greyOrBrown, startImageIndex){
		var arrayOfImgs = [];
		var startPart = greyOrBrown == 1 ? 'imgs/a100' : 'imgs/c400';
		var endPart;
		for (var i = startImageIndex; i < 16; i++) {
			endPart = i < 10 ? '0' + i: i + '';
			endPart += '.png';
			arrayOfImgs.push(startPart + endPart);
		};

		for (var i = 0 ; i < startImageIndex; i++) {
			endPart = i < 10 ? '0' + i: i + '';
			endPart += '.png';
			arrayOfImgs.push(startPart + endPart);
		};
		return arrayOfImgs;
	},

	/**
	 * Creates a given amount of asteroids using the asteroids atlas.
	 *
	 * Randomly determines whethere an asteroid should be grey or brown, then chooses 
	 * a random frame to spawn the asteroid with and adds animations for the asteroid 
	 * continuing from the random frame it starts at.
	 *
	 * Randomly scales the asteroid down between 30% and 100% of the original image.
	 *
	 * Sets the asteroids acceleration and velocity to the max plus a slight random 
	 * variant to allow asteroids to fly at different speeds.
	 * 
	 * @param  {number} n The number of asteroid sprites to create.
	 */
	create: function(n){
		for (var i = 0; i < n; i++) {
			var xy = this.checkSpawn();
			var greyOrBrown = game.rnd.integerInRange(0, 1)
			var startImageIndex = game.rnd.integerInRange(0, 15);
			startImageIndex = startImageIndex < 10 ? '0' + startImageIndex: startImageIndex;
			if(greyOrBrown == 1)	
			{
				var ast = asteroids.create(xy[0], xy[1], 'asteroids', 'imgs/a100' + startImageIndex + '.png');

			}else{
				var ast = asteroids.create(xy[0], xy[1], 'asteroids', 'imgs/c400' + startImageIndex + '.png');
			}				
			var  scaleFactor = game.rnd.realInRange(0.3, 1);
			ast.animations.add('rotate', this.populateAnimationArray(greyOrBrown, startImageIndex), 0, true, false);	
			ast.body.maxVelocity.set(max_velocity + game.rnd.integerInRange(0, 15));
			ast.scale.setTo(scaleFactor, scaleFactor);
			ast.body.setSize(ast.width*.8, ast.height*.8, ast.width*0.1,  ast.height*0.1);	
			ast.body.reset(ast.x + ast.width*0.07, ast.y + ast.height*0.07 );
			ast.body.acceleration.set(max_acceleration + game.rnd.realInRange(0.1, 1));					
		}
	},
	/**
	 * This function checks to make sure the x and y of a new spawn location is not too close to the space ship.
	 * 
	 * @return {array}
	 */
	checkSpawn: function(){		
		var x = game.world.randomX;
		var y = game.world.randomY;
		if (circleRadius > 450) bounds = 400;
		else bounds = circleRadius;
		while (Math.round(Phaser.Math.distance(x, y, player.x, player.y)) <= bounds*0.75){
			x = game.world.randomX;
			y = game.world.randomY;
		}
		return [x, y];
	},

	/**
	 * Revives a 'killed' asteroid in a new location instead of creating an entire new object.
	 * 
	 * @param  {asteroid} asteroidObj An asteroid from the asteroids group.
	 * @return {[type]}
	 */
	reviveAsteroid: function(asteroidObj){
		asteroidObj.revive();
		var xy = this.checkSpawn();
		asteroidObj.x = xy[0];
		asteroidObj.y = xy[1];
	}
}