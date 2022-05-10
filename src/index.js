import Phaser from 'phaser';
import { FirstLvl } from './scenes/firstLvl';
// import { Gameover } from './scenes/gameover';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    mort: false,
    width: 800,
    height: 640,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: FirstLvl
};

const game = new Phaser.Game(config);
