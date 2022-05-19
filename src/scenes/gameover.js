import Phaser from "phaser";
import restart from "../assets/reset.png";
import background from "../assets/backgrnd.jpg";
import gameover from '../assets/gameover.png';

var score;
var losemusic;

export default class Gameover extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  preload() {
    this.load.image('reload',restart);
    this.load.image('background', background);
    this.load.image('gameover', gameover);
    this.load.audio('lose', ["/src/assets/lose.mp3"]);
  }
  
  create(data) {
    this.losemusic = this.sound.add('lose', {loop:true});
    this.losemusic.play();

    this.score = data.score || 0;

    console.log(data.score)
    var background = this.add.image(600,425,'background');
    this.restartButton = this.add.sprite(600,775,'reload').setInteractive();
    this.restartButton.setScale(0.25);
    this.restartButton.on('pointerdown', () => {
      this.losemusic.stop();
      this.scene.start('FirstLvl', {score: 0, vides: 3});
    });
    var gameoverImg = this.add.image(600,425,'gameover');
    var finalScore = this.add.text(500, 550, 'Score: '+this.score, { fontSize: '32px', fill: '#000' });;
  }
}