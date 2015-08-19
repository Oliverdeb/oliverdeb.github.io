startState = {
	create: function(){
		game.time.advancedTiming = true;
		rocketSound = game.add.sound('rocketSound', 0.5, true);
		blast = game.add.sound('blast');
		pew = game.add.sound('pew', 0.6);
		rocketSound.play();
		game.add.sprite(0, 0, 'background');

		player    = game.add.sprite(game.width/2, game.height/2, 'space_ship');
		player.animations.add('walk', [1, 2],10, true);
		player.animations.add('still', [0],10, true);
		player.animations.add('explosion', [3],10, true);
		player.anchor.setTo(0.5, 0.5);
		player.scale.setTo(0.6);
		game.physics.arcade.enable(player);

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
		asteroid.create(max_asteroids);
		


		if(!debugMode){							//Create light/Shadow texture
			game.stage.backgroundColor = 0x4488cc;
			game.shadowTexture         = game.add.bitmapData(game.width,game.height);
			lightSprite                = game.add.image(0,0,game.shadowTexture);
			lightSprite.blendMode      = Phaser.blendModes.MULTIPLY;		
		}			
		fpsMeter = game.add.text(0, 0, "FPS:" + game.time.fps, {font: '32px Arial', fill: '#fff'});
	},

	update: function(){
		if(gameover == false){
			if(!debugMode){
				light -= difference;	
				this.updateShadowTexture(light);	
			}					
			this.updateFPS();
			if(light < 5){
				gameover = true;				
				time = game.time.now + 2000;
				theme.pause();
			}

			if(cursors.up.isDown){
				player.animations.play('walk', 20, true);
		    	rocketSound.resume();    	
		        game.physics.arcade.accelerationFromRotation(player.rotation, max_velocity, player.body.acceleration);
			}else{
				rocketSound.pause();
				player.animations.play('still', 20, true);
				player.body.acceleration.set(max_acceleration);
			}
			if (cursors.left.isDown)	player.body.angularVelocity = -300;	    
		    else if (cursors.right.isDown)	player.body.angularVelocity = 300;
		    else	player.body.angularVelocity = 0;

		    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !keyboard_down) {	  
			    if (this.ammo()){
		    		this.fire();
		    		keyboard_down = true; 
		    		ammo--;
		    	}
		    }
		    if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))  	keyboard_down = false;

		    this.screenWrap(player);
			powerups.forEachExists(this.screenWrap, this);
			asteroids.forEachExists(this.screenWrap, this);
			bullets.forEachExists(this.screenWrap, this);

			if(!debugMode) game.physics.arcade.overlap(player, asteroids, collide.shipAsteroid, null, this);	    
			game.physics.arcade.overlap(player, powerups, collide.shipPowerup, null, this);	
			game.physics.arcade.overlap(bullets, asteroids, collide.bulletAsteroid, null, this);
			if(game.time.now > lastBulletTime) game.physics.arcade.overlap(player, bullets, collide.shipBullet, null, this);
			game.physics.arcade.overlap(bullets, powerups, collide.bulletPowerup, null, this);


		}else {
			rocketSound.pause();			
			if(game.time.now > time) {				
				game.state.start('gameOver');
			}
		}
	},	

	movement: function(){
		game.renderer.clearBeforeRender  = false;
		game.renderer.roundPixels        = true;	
		//game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.physics.enable(player, Phaser.Physics.ARCADE);	
		player.body.drag.set(drag);
		player.body.maxVelocity.set(max_velocity);
		cursors                          = game.input.keyboard.createCursorKeys();	

	},

	updateShadowTexture: function(radius){				
		game.LIGHT_RADIUS                    = radius;	
		game.shadowTexture.context.fillStyle = 'rgb(0,0,0)';
		game.shadowTexture.context.fillRect(0, 0, game.width, game.height);
		game.shadowTexture.context.beginPath();
		game.shadowTexture.context.fillStyle = 'rgb(255,255,255)';
		game.shadowTexture.context.arc(player.x, player.y, game.LIGHT_RADIUS, 0, Math.PI*2);
		game.shadowTexture.context.fill();
		game.shadowTexture.dirty             = true;
	},

	render: function(){
		if(debugMode){
			game.debug.bodyInfo(player, 32, 32);
			game.debug.body(player);
		    asteroids.forEach(	
		    	function(asteroid){
		     		game.debug.body(asteroid)
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
		if (game.time.now > bulletTime) {
        	bullet = bullets.getFirstExists(false);
	        if (bullet) {
				bullet.reset(player.x, player.y);
				bullet.lifespan = 2000;
				bullet.rotation = player.rotation;
				game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
				pew.play();
				bulletTime      = game.time.now + 50;
				lastBulletTime      = game.time.now + 500;
        	}
		}		
	},

	ammo: function(){
		return ammo > 0 ? true: false;
	},

	updateFPS: function(){
		fpsMeter.setText("FPS:" + game.time.fps);
	}
}