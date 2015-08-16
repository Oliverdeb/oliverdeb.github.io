//By Oliver De Bruin and Cary Small from UCT
function preload() {	
	game.load.image('plus', 'assets/plus.png');					//loading of resources
	game.load.image('background', 'assets/starBackground.png');
	game.load.image('asteroid_big', 'assets/meteorBig.png');
	game.load.image('asteroid_small', 'assets/meteorSmall.png');    
	game.load.image('bullet', 'assets/bullet.png');
	game.load.spritesheet('space_ship', 'assets/player.png',100,100,4);
	game.load.audio('audio', "assets/sound/rocket.mp3");
	game.load.audio('blast', "assets/sound/blast.mp3");
	game.load.audio('end', "assets/sound/end.mp3");
	game.load.audio('pew', 'assets/sound/pew.mp3');
	game.load.audio('theme', 'assets/sound/theme.mp3');
	//game.load.audio('gameover', 'assets/sound/gameover.mp3');    
}

function update() {
	if (gameover == false){			// Check whether the game is over, if not contiue to update lighting
									// and do all the collision detections and sound 
		if(!debug){
			light -=difference;	
			updateShadowTexture(light);	
		}				
		if(light < 10){
			gameover = true;
			light = 0;
			playGameover();
		}		
		if (cursors.up.isDown)
	    {    	
	    	player.animations.play('walk', 20, true);
	    	sound.resume();    	
	        game.physics.arcade.accelerationFromRotation(player.rotation, max_velocity, player.body.acceleration);
	    }else{
	    	player.animations.play('still', 20, true);
	    	sound.pause();
	        player.body.acceleration.set(max_acceleration);
	    }
	    if (cursors.left.isDown)	player.body.angularVelocity = -300;	    
	    else if (cursors.right.isDown)	player.body.angularVelocity = 300;
	    else	player.body.angularVelocity = 0;
	    
	    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !keyboard_down) {	  
		    if (hasAmmo()){
	    		fireBullet();
	    		keyboard_down = true; 
	    		ammo--;
	    	}
	    }
	    if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))  	keyboard_down = false;
	    
	    screenWrap(player);
	   	bullets.forEachExists(screenWrap, this);
	    asteroids.forEachExists(screenWrap, this);  //Screen wrapping to make asteroids go to top of screen when at edge
	    if(!debug) game.physics.arcade.overlap(player, asteroids, collideAsteroid, null, this);	    //collision detections
		game.physics.arcade.overlap(player, pickups, collidePickup, null, this);	
		game.physics.arcade.overlap(bullets, asteroids, collideBulletAsteroid, null, this);
		game.physics.arcade.overlap(bullets, pickups, collideBulletPickup, null, this);
	}else{
		sound.pause();
	}
}	



function screenWrap (sprite) {				//Wraps sprites that reach the edge of the screen
	if (sprite.x < 0)	sprite.x                 = game.width;
	else if (sprite.x > game.width)	sprite.x     = 0;
	if (sprite.y < 0)	sprite.y                 = game.height;
	else if (sprite.y > game.height)	sprite.y = 0;
}

function playGameover(){
	theme.pause();	
}
