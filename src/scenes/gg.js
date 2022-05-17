import Phaser from "phaser";
import congratulations from "../assets/congratulations.png";
import background from "../assets/backgrnd.jpg";
import restart from "../assets/reset.png";

var restartButton;

export default class gg extends Phaser.Scene
{
    constructor()
    {
        super('gg')
    }
    preload()
    {
        this.load.image('congrats', congratulations);
        this.load.image('background', background);
        this.load.image('reload',restart);
    }
    create()
    {
        var background = this.add.image(600,425,'background');
        var congratsImage = this.add.image(600,425,'congrats');

        this.restartButton = this.add.sprite(600,775,'reload').setInteractive();
        this.restartButton.setScale(0.25);
        this.restartButton.on('pointerdown', () => {
            this.scene.start('FirstLvl');
        });
    }
}