//By Oliver De Bruin and Cary Small from UCT
function createAsteroid(){
	var x = Math.round(Math.random()*game.width)+1;		// the asteroid is not in the rockets vicinity.
	var y = Math.round(Math.random()*game.height)+1;	

	while (Phaser.Math.distanceRounded(x, y, player.x, player.y) <= light*0.75){
		x = Math.round(Math.random()*game.width)+1;
		y = Math.round(Math.random()*game.height)+1;
	}
	if((Math.round(Math.random()*3)+1) == 1)	var asteroid = asteroids.create(x, y, 'asteroid_big');
	else	var asteroid = asteroids.create(x, y, 'asteroid_small');
	asteroid.body.acceleration.set(max_acceleration);	
	asteroid.body.setSize(asteroid.width*0.80, asteroid.height*0.8, asteroid.width*0.1, asteroid.height*0.1);
}
