startState = {
	create: function(){
		game.add.sprite(0, 0, 'background');
		player = game.add.sprite(game.width/2, game.height/2, 'space_ship');
		player.anchor.setTo(0.5, 0.5);
		player.scale.setTo(0.6);
		game.physics.arcade.enable(player);
		asteroids = game.add.group();
	},

	update: function(){

	},	

	render: function(){
		if(debugMode){
			game.debug.bodyInfo(player, 32, 32);
			game.debug.body(player);
		    // asteroids.forEach(function(asteroid){
		    // game.debug.body(asteroid)
		    // }, asteroid);
		    /*asteroids.forEach(	function(asteroid)	{
				game.debug.body(asteroid)
			});

		    pickups.forEach(function(pickup){
		        game.debug.body(pickup);
		    });*/
		}
	}	
}