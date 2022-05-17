import Phaser from "phaser";
import restart from "../assets/reset.png";
import background from "../assets/backgrnd.jpg";
import gameover from '../assets/gameover.png';

export default class Gameover extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  preload() {
    this.load.image('reload',restart);
    this.load.image('background', background);
    this.load.image('gameover', gameover);
  }
  
  create() {
    var background = this.add.image(600,425,'background');
    this.restartButton = this.add.sprite(600,775,'reload').setInteractive();
    this.restartButton.setScale(0.25);
    this.restartButton.on('pointerdown', () => {
        this.scene.start('FirstLvl');
    });
    var gameoverImg = this.add.image(600,425,'gameover');
  }
}