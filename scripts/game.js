var game = new Phaser.Game(800, 600, Phaser.AUTO, 'mainGameDiv');

game.state.add('boot', bootState);
game.state.add('preLoad', preLoadState);
game.state.add('title', titleState);
game.state.add('start', startState);
//game.state.add('gameOver', gameOverState);

game.state.start('boot');