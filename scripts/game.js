var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'mainGameDiv');

game.state.add('boot', bootState);
game.state.add('preLoad', preLoadState);
game.state.add('title', titleState);
game.state.add('difficulty', difficultyState);
game.state.add('start', startState);
game.state.add('gameOver', gameOverState);

game.state.start('boot');