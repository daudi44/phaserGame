import Phaser from "phaser";
import congratulations from "../assets/congratulations.png";
import background from "../assets/backgrnd.jpg";
import restart from "../assets/reset.png";

var restartButton;
var score;
var musicaGG;

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
        this.load.audio('musicGG', ["/assets/win.mp3"]);
    }
    create(data)
    {
        this.musicaGG = this.sound.add('musicGG', {loop: true});
        this.musicaGG.play();

        this.score = data.score
        var background = this.add.image(600,425,'background');
        var congratsImage = this.add.image(600,425,'congrats');
        var finalScore = this.add.text(450, 675, 'Score: '+this.score, { fontSize: '32px', fill: '#000' });;

        this.restartButton = this.add.sprite(600,775,'reload').setInteractive();
        this.restartButton.setScale(0.25);
        this.restartButton.on('pointerdown', () => {
            this.musicaGG.stop();
            this.scene.start('menu');
        });
    }
}