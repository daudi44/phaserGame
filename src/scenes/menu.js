import Phaser from "phaser";
import background from "../assets/backgrnd.jpg";
import start from "../assets/start.png";
import github from "../assets/github.png";
import jumpyalien from "../assets/jumpyalien.png";

var startVal;
var githubVal;
var jumpyalienVal;

export default class menu extends Phaser.Scene
{
    constructor()
    {
        super('menu')
    }
    preload()
    {
        this.load.image('background', background);
        this.load.image('start',start);
        this.load.image('github',github);
        this.load.image('jumpyalien',jumpyalien);
    }
    create()
    {
        var background = this.add.image(600,425,'background');

        this.jumpyalienVal = this.add.sprite(600,200,'jumpyalien');
        this.jumpyalienVal.setScale(0.5);

        this.startVal = this.add.sprite(600,430,'start').setInteractive();
        this.startVal.setScale(0.75);
        this.startVal.on('pointerdown', () => {
            this.scene.start('FirstLvl');
        });

        this.githubVal = this.add.sprite(600,600,'github').setInteractive();
        this.githubVal.setScale(0.39);
        this.githubVal.on('pointerdown', () => {
            var s = window.open('https://github.com/daudi44/phaserGame', '_blank');
            s.focus();
        });
    }
}