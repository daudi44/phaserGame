import Phaser from 'phaser';
import  FirstLvl  from './scenes/FirstLvl';
// import { Gameover } from './scenes/gameover';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    mort: false,
    width: 1200,
    height: 850,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 450 },
            debug: false
        }
    },
    scene: FirstLvl
};

new Phaser.Game(config);
