import Phaser from 'phaser';
import FirstLvl  from './scenes/FirstLvl';
import gg from './scenes/gg';
import gameover from './scenes/gameover';
import SecondLvl from './scenes/SecondLvl';
import menu from './scenes/menu';

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
    scene: [menu,FirstLvl, gg, gameover, SecondLvl]
    // scene: FirstLvl
};

new Phaser.Game(config);
