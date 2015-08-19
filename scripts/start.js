startState = {
	create: function(){
		game.add.sprite(0, 0, 'background');

		player    = game.add.sprite(game.width/2, game.height/2, 'space_ship');
		player.anchor.setTo(0.5, 0.5);
		player.scale.setTo(0.6);
		game.physics.arcade.enable(player);

		powerups = game.add.group();
		powerups.enableBody = true;
		powerups.createPowerup(max_pickups);

		bullets = game.add.group();
		bullets.enableBody = true;

		asteroids = game.add.group();
		asteroids.enableBody = true;
		asteroid.create(max_asteroids);


		if(!debugMode){							//Create light/Shadow texture
			game.stage.backgroundColor = 0x4488cc;
			game.shadowTexture         = game.add.bitmapData(game.width,game.height);
			lightSprite            = game.add.image(0,0,game.shadowTexture);
			lightSprite.blendMode      = Phaser.blendModes.MULTIPLY;		
		}			
	},

	update: function(){
		if(!gameover){

			if(!debugMode){
				light -= difference;	
				this.updateShadowTexture(light);	
			}		

		}else game.state.start('gameover');
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

	updateShadowTexture: function(radius){					//Shadow texture setup
		game.LIGHT_RADIUS                    = radius;	
		game.shadowTexture.context.fillStyle = 'rgb(0,0,0)';
		game.shadowTexture.context.fillRect(0,0,game.width,game.height);
		game.shadowTexture.context.beginPath();
		game.shadowTexture.context.fillStyle = 'rgb(255,255,255)';
		game.shadowTexture.context.arc(player.x,player.y,game.LIGHT_RADIUS,0,Math.PI*2);
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
		    pickups.forEach(function(pickup){
		        game.debug.body(pickup);
		    });
		}
	}	
}