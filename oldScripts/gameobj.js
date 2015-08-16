if(debug) var game = new Phaser.Game(800, 600, Phaser.WEBGL, '', { preload: preload, create: create, update: update, render: render });
else var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function init(){		
	
	
	
};

function render() {
    game.debug.bodyInfo(player, 32, 32);
    game.debug.body(player);
    // asteroids.forEach(function(asteroid){
    // 	game.debug.body(asteroid)
    // }, asteroid);
    asteroids.forEach(	function(asteroid)	{
		game.debug.body(asteroid)
	});

    pickups.forEach(function(pickup){
        game.debug.body(pickup);
    });

}