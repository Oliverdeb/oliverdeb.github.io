//By Oliver De Bruin and Cary Small from UCT	

function create(){
	sound = game.add.sound('audio', 0.3, true);		// seting up sound
	blast = game.add.sound('blast');
	pew   = game.add.sound('pew');
	theme = game.add.sound('theme', 0.5, true);	
	theme.play();
	sound.play();
	
	game.add.sprite(0, 0, 'background'); 

	player = game.add.sprite(game.width/2, game.height/2, 'space_ship');	//Animation for rocket ship

	player.animations.add('walk', [1, 2],10, true);
	player.animations.add('still', [0],10, true);
	player.animations.add('exposion', [3],10, true);
	player.anchor.set(0.5, 0.5);	
	player.scale.setTo(0.6,0.6);	
	
	game.physics.arcade.enable(player);	//setting physcis of the ship
	//player.body.setSize(player.width*0.999, player.height*0.999, player.width*0.001, player.height*0.001); //chaning bounds
	
	movement();		
	startTime               = game.time.time;
	pickups                 = game.add.group();				//Intialising pickups
	pickups.enableBody      = true;
	
	asteroids               = game.add.group();			//Initialising asteroids
	asteroids.enableBody    = true;
	for (var i = 0; i < max_pickups; i++) {
		powerup.createDrop();
	}
	
	bullets                 = game.add.group();				//Declaring and initialising bullet objects and scaling
	bullets.enableBody      = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('scale.x', 0.5);
    bullets.setAll('scale.y', 0.5);
	
	for (var i= 0; i < max_asteroids; i++) {	//Create Initial asteroids
		createAsteroid();		
	};
	
	centreCanvas();
	if(!debug){							//Create light/Shadow texture
		game.stage.backgroundColor = 0x4488cc;
		game.shadowTexture         = game.add.bitmapData(game.width,game.height);
		lightSprite            = game.add.image(0,0,game.shadowTexture);
		lightSprite.blendMode      = Phaser.blendModes.MULTIPLY;		
	}			
}

function centreCanvas(){				//Centres the main canvas
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically   = true;
	game.scale.refresh();
}
	
	function movement(){					//Movement of rocket ship
	game.renderer.clearBeforeRender  = false;
	game.renderer.roundPixels        = true;	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.enable(player, Phaser.Physics.ARCADE);	
	player.body.drag.set(drag);
	player.body.maxVelocity.set(max_velocity);
	cursors                          = game.input.keyboard.createCursorKeys();	
}

function updateShadowTexture(lightra){					//Shadow texture setup
	game.LIGHT_RADIUS                    = lightra;	
	game.shadowTexture.context.fillStyle = 'rgb(0,0,0)';
	game.shadowTexture.context.fillRect(0,0,game.width,game.height);
	game.shadowTexture.context.beginPath();
	game.shadowTexture.context.fillStyle = 'rgb(255,255,255)';
	game.shadowTexture.context.arc(player.x,player.y,game.LIGHT_RADIUS,0,Math.PI*2);
	game.shadowTexture.context.fill();
	game.shadowTexture.dirty             = true;
}


function fireBullet(){
	if (hasAmmo()){		
		if (game.time.now > bulletTime)
	    {
	        bullet = bullets.getFirstExists(false);
	        if (bullet)
	        {
				bullet.reset(player.body.x + 16, player.body.y + 16);
				bullet.lifespan = 2000;
				bullet.rotation = player.rotation;
				game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
				pew.play();
				bulletTime      = game.time.now + 50;
	        }
	    }
	}
}

/*function render(){
	console.log("test");
	game.debug.bodyInfo(player, 32, 32);
	game.debug.body(player);
	
}
*/


function hasAmmo(){
	return ammo > 0 ? true: false;
}