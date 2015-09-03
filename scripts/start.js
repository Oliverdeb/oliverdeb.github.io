startState = {	

	create: function(){
		if(!soundMuted) this.init_sound();		
		game.time.advancedTiming = true;		
		game.add.sprite(0, 0, 'background');

		player    = game.add.sprite(game.width/2, game.height/2, 'ship');		
		game.physics.arcade.enable(player);
		player.animations.add('idle', [0], 10, false);
		player.animations.add('fly', [1, 2], 10, true);	
		player.body.setSize(player.width * .7, player.height * 0.9, player.width * .05, 0);		
		player.anchor.setTo(0.5, 0.5);	
		player.scale.setTo(0.6);

		this.movement();

		powerups = game.add.group();
		powerups.enableBody = true;
		powerup.createPowerup(max_pickups);

		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(40, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 0.5);
	    bullets.setAll('scale.x', 0.5);
	    bullets.setAll('scale.y', 0.5);

		asteroids = game.add.group();
		asteroids.enableBody = true;		
		asteroid.populateAnimationArray();
		asteroid.create(max_asteroids);

		spacePressedCapture = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spacePressedCapture.onDown.add(this.fire, this);
		


		if(!debugMode){							
			game.stage.backgroundColor = 0x4488cc;
			game.shadowTexture         = game.add.bitmapData(game.width,game.height);
			circleRadiusSprite                = game.add.image(0,0,game.shadowTexture);
			circleRadiusSprite.blendMode      = Phaser.blendModes.MULTIPLY;		
		}			
		if(debugMode)	{
			fpsMeter = game.add.text(0, game.height, "FPS:" + game.time.fps, fontStyle);
			fpsMeter.anchor.setTo(0, 1);
		}
		ammoCounter = game.add.text(0, 0, 'Ammo:' + ammo, fontStyle);
		scoreCounter = game.add.text(ammoCounter.x, ammoCounter.y + ammoCounter.height, 'Score: ' + score, fontStyle);		
		asteroidAnimationTimer = game.time.now + timeBetweenAnimationUpdates;
	},

	update: function(){
		if(gameover == false){
			if(!debugMode){
				circleRadius -= circleDecreaseAmt;	
				this.updateShadowTexture(circleRadius);	
			}					
			this.updateText();
			if(circleRadius < 5){
				gameover = true;				
				time = game.time.now + 2000;
				theme.pause();
			}
			if(cursors.up.isDown){
				player.animations.play('fly', 30, true);
		    	if(!soundMuted) {
		    		rocketSound.resume();   
		    		if(!rocketSound.isPlaying) rocketSound.play();	
		    	}
		        game.physics.arcade.accelerationFromRotation(player.rotation, player_max_velocity, player.body.acceleration);
			}else{
				if(!soundMuted) rocketSound.pause();
				player.animations.play('idle', 20, true);
				player.body.acceleration.set(max_acceleration);
			}
			if (cursors.left.isDown)	player.body.angularVelocity = -turnSpeed;	    
		    else if (cursors.right.isDown)	player.body.angularVelocity = turnSpeed;
		    else	player.body.angularVelocity = 0;

		    this.screenWrap(player);
			powerups.forEachExists(this.screenWrap, this);
			asteroids.forEachExists(this.screenWrap, this);
			bullets.forEachExists(this.screenWrap, this);

			if(!debugMode) game.physics.arcade.overlap(player, asteroids, collide.shipAsteroid, null, collide);	    
			game.physics.arcade.overlap(player, powerups, collide.shipPowerup, null, this);	
			game.physics.arcade.overlap(bullets, asteroids, collide.bulletAsteroid, null, this);
			if(game.time.now > lastBulletTime) game.physics.arcade.overlap(player, bullets, collide.shipBullet, null, collide);
			game.physics.arcade.overlap(bullets, powerups, collide.bulletPowerup, null, this);


		}else {			
			if(!soundMuted) rocketSound.pause();			
			if(game.time.now > time) {				
				game.state.start('gameOver');
			}
		}
		if(amountOfAnimationUpdates < animationSpeedThreshold && game.time.now > asteroidAnimationTimer) this.updateAnimations();
	},	

	updateAnimations: function(){
		asteroidAnimationTimer = game.time.now + timeBetweenAnimationUpdates;
		amountOfAnimationUpdates++;
		asteroids.forEachExists(function(asteroidObj){
			asteroidObj.animations.stop();
			asteroidObj.animations.play('rotate', 5 + amountOfAnimationUpdates, true, false);
		}, this);
	},	

	movement: function(){
		game.renderer.clearBeforeRender  = false;
		game.renderer.roundPixels        = true;	
		player.body.drag.set(drag);
		player.body.maxVelocity.set(player_max_velocity);
		cursors                          = game.input.keyboard.createCursorKeys();	

	},

	updateShadowTexture: function(radius){				
		game.circleRadius_RADIUS                    = radius;	
		game.shadowTexture.context.fillStyle = 'rgb(0,0,0)';
		game.shadowTexture.context.fillRect(0, 0, game.width, game.height);
		game.shadowTexture.context.beginPath();
		game.shadowTexture.context.fillStyle = 'rgb(255,255,255)';
		game.shadowTexture.context.arc(player.x, player.y, game.circleRadius_RADIUS, 0, Math.PI*2);
		game.shadowTexture.context.fill();
		game.shadowTexture.dirty             = true;
	},

	render: function(){
		if(debugMode){
			game.debug.bodyInfo(player, 32, 32);
			game.debug.body(player);
		    asteroids.forEach(	
		    	function(asteroid){
		     		game.debug.body(asteroid);
		     },
		     asteroid);

		    powerups.forEach(
		    	function(powerup){
		        	game.debug.body(powerup);
		    });
		}
	},

	screenWrap: function(sprite){
		if(sprite.x > game.width) sprite.x = 0;
		else if(sprite.x < 0) sprite.x = game.width
		if(sprite.y > game.height) sprite.y = 0;
		else if(sprite.y < 0) sprite.y = game.height;
	},

	fire: function(){	
		if(!this.ammo() || gameover) return;
		ammo--;
		if (game.time.now > bulletTime) {
        	bullet = bullets.getFirstExists(false);
	        if (bullet) {
				bullet.reset(player.x, player.y);
				bullet.lifespan = 3000;
				bullet.rotation = player.rotation;
				game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
				if(!soundMuted) pew.play();
				bulletTime      = game.time.now + 50;
				lastBulletTime      = game.time.now + 500;
        	}
		}		
	},

	ammo: function(){
		return ammo > 0 ? true: false;
	},

	updateText: function(){
		if(debugMode)	fpsMeter.setText("FPS:" + game.time.fps);
		ammoCounter.setText('Ammo:' + ammo);
	},

	init_sound: function(){
		rocketSound = game.add.sound('rocketSound', 0.3, true);
		blast = game.add.sound('blast', 0.5);
		pew = game.add.sound('pew', 0.6);
		rocketSound.play();
		rocketSound.pause();
	}
}