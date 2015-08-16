//By Oliver De Bruin and Cary Small from UCT
function createAsteroid(){
	var xy = checkSpawn();
	if((Math.round(Math.random()*3)+1) == 1)	var asteroid = asteroids.create(xy[0], xy[1], 'asteroid_big');
	else	var asteroid = asteroids.create(xy[0], xy[1], 'asteroid_small');
	asteroid.body.acceleration.set(max_acceleration);	
	asteroid.body.setSize(asteroid.width*0.80, asteroid.height*0.8, asteroid.width*0.1, asteroid.height*0.1);
	asteroid.body.maxVelocity.set(50*difficulty);
}

function checkSpawn(){light*0.75
	var x = Math.round(Math.random()*game.width)+1;		// the asteroid is not in the rockets vicinity.
	var y = Math.round(Math.random()*game.height)+1;
	if (light > 450) bounds = 450;
	else bounds = light;
	while (Phaser.Math.distanceRounded(x, y, player.x, player.y) <= bounds*0.75){
		x = Math.round(Math.random()*game.width)+1;
		y = Math.round(Math.random()*game.height)+1;
	}
	return [x, y];
}
