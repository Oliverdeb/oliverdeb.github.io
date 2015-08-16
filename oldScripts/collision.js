//By Oliver De Bruin and Cary Small from UCT
function collideAsteroid(){ //Collision call back for overlap between rocket ship and asteroids
	blast.play();
	sound.pause();
	player.animations.play('exposion', 20, true);		
	gameover = true;
	playGameover();
}

function collidePickup(){	
	ammo += pickup_bonus_ammo;					
	light += pickup_bonus_life;							//Collision of rocket with pickup - > callback of overlap
	pickups.forEachExists(powerup.respawnDrops, this);	
}

function collideBulletPickup(bullet){
	light += pickup_bonus_life;
	ammo += pickup_bonus_ammo;
	bullet.kill();
	pickups.forEach(function(sprite){
		powerup.respawnDrops(sprite)
	});
}

function collideBulletAsteroid(bullet, asteroid){	//Collision of bullet with asteroid -> callback of overlap
    asteroid.kill();
    createAsteroid();
    bullet.kill();
}
