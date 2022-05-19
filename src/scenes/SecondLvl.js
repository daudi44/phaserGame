import Phaser from "phaser";
import tileImg from '../assets/terrainTiles.png';
import mapJson2 from '../assets/mapa2.json';
import dude from '../assets/playerGB.png';
import coinImg from '../assets/coin3_16x16.png';
import spikesLarge from '../assets/SpikesLarge.png';
import door from '../assets/door.png';
import heart from '../assets/heart.png';

var player2;
var cursors;
var terra2;
var dieLayer2;
var score;
var dobeljump = 0;
var scoreText;
var coins2;
var vides = 3;
var hearts;
var musicaLvl2;
var coinSound2;
var musicasiono2;

class SecondLvl extends Phaser.Scene
{
    constructor()
    {
        super('SecondLvl')
    }

    preload()
    {
        this.load.spritesheet('dude', dude, { frameWidth: 16, frameHeight: 17 });
        this.load.image('tiles',tileImg);
        this.load.image('spikes',spikesLarge);
        this.load.image('door',door);
        this.load.image('heart',heart);
        this.load.audio('musicLvl2', ["/src/assets/lvl2.mp3"]);
        this.load.audio('coinSound', ["/src/assets/coinSound.mp3"]);
        this.load.spritesheet('coin2',coinImg, { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('def_map2',mapJson2);

    }
    create(data)
    {

        this.musicaLvl2 = this.sound.add('musicLvl2', {loop: true, volume: 0.5});

        this.musicaLvl2.play();

        this.coinSound2 = this.sound.add('coinSound', {loop:false});

        this.vides = data.vides;
        this.score = data.score;

        //DECLARO ELS LIMITS DE LA CAMARA
        this.cameras.main.setBounds(0, 0, 800, 640);

        //CREACIÓ DEL MAPA
        const mapa = this.make.tilemap({key: "def_map2", tileHeight: 64, tileWidth: 64});
        const tileset = mapa.addTilesetImage('Terrain (32x32)','tiles');
        mapa.createLayer("Tile Layer 1", tileset, 0, 0);
        this.terra2 = mapa.createLayer("ground", tileset, 0, 0);
        this.dieLayer2 = mapa.createLayer("die",tileset,0,0);

        //CREACIÓ DEL PLAYER
        this.player2 = this.physics.add.sprite(32, 500, 'dude');
        this.player2.setBounce(0);
        this.player2.setCollideWorldBounds(true);
        this.player2.setScale(1.2);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 8 }),
            frameRate: 5,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 0 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 8 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'jumpy',
            frames: [ { key: 'dude', frame: 1 } ],
            frameRate: 5,
            repeat: 0
        });

        //VIDES RESTANTS 
        this.hearts = this.physics.add.group({
            key: 'heart',
            repeat: this.vides-1,
            setXY: {x: 760, y:270, stepX:20}
        });
        this.hearts.children.iterate(function(child){
            child.body.setAllowGravity(false);
            child.setScrollFactor(0);
        });

        //CREO LES MONEDES D'AQUESTA PANTALLA
        this.anims.create({
            key: 'flip',
            frames: this.anims.generateFrameNumbers('coin2', {start: 0, end: 13}),
            frameRate: 10,
            repeat: -1
        });
        this.coins2 = this.physics.add.group({
            key: 'coin2',
            setXY:{x:1000,y:1000}
        });

        for(var i = 0; i < 18; i++){
            switch(i){
                case 0:
                    var moneda1 = this.coins2.create(373,500)
                    moneda1.body.setAllowGravity(false)
                    moneda1.anims.play('flip', true)
                case 1:
                    var moneda2 = this.coins2.create(150,510)
                    moneda2.body.setAllowGravity(false)
                    moneda2.anims.play('flip', true)
                case 2:
                    var moneda3 = this.coins2.create(373,300)
                    moneda3.body.setAllowGravity(false)
                    moneda3.anims.play('flip', true)
                case 3:
                    var moneda4 = this.coins2.create(200,350)
                    moneda4.body.setAllowGravity(false)
                    moneda4.anims.play('flip', true)
                case 4:
                    var moneda5 = this.coins2.create(210,275)
                    moneda5.body.setAllowGravity(false)
                    moneda5.anims.play('flip', true)
                case 5:
                    var moneda6 = this.coins2.create(79,330)
                    moneda6.body.setAllowGravity(false)
                    moneda6.anims.play('flip', true)
                case 6:
                    var moneda7 = this.coins2.create(373,200)
                    moneda7.body.setAllowGravity(false)
                    moneda7.anims.play('flip', true)
                case 7:
                    var moneda8 = this.coins2.create(175,175)
                    moneda8.body.setAllowGravity(false)
                    moneda8.anims.play('flip', true)
                case 8:
                    var moneda9 = this.coins2.create(50,100)
                    moneda9.body.setAllowGravity(false)
                    moneda9.anims.play('flip', true)
                case 9:
                    var moneda10 = this.coins2.create(110,50)
                    moneda10.body.setAllowGravity(false)
                    moneda10.anims.play('flip', true)
                case 10:
                    var moneda11 = this.coins2.create(565,300)
                    moneda11.body.setAllowGravity(false)
                    moneda11.anims.play('flip', true)
                case 11:
                    var moneda11 = this.coins2.create(430,500)
                    moneda11.body.setAllowGravity(false)
                    moneda11.anims.play('flip', true)
                case 12:
                    var moneda12 = this.coins2.create(565,465)
                    moneda12.body.setAllowGravity(false)
                    moneda12.anims.play('flip', true)
                case 13:
                    var moneda13 = this.coins2.create(650,500)
                    moneda13.body.setAllowGravity(false)
                    moneda13.anims.play('flip', true)
                case 14:
                    var moneda14 = this.coins2.create(685,300)
                    moneda14.body.setAllowGravity(false)
                    moneda14.anims.play('flip', true)
                case 15:
                    var moneda15 = this.coins2.create(685,170)
                    moneda15.body.setAllowGravity(false)
                    moneda15.anims.play('flip', true)
                case 16:
                    var moneda16 = this.coins2.create(625,100)
                    moneda16.body.setAllowGravity(false)
                    moneda16.anims.play('flip', true)
                
            }
            break;
        }
        this.physics.add.overlap(this.player2, this.coins2, this.takeCoin, null, this);

        //DECLARO ELS PARAMETRES DE LA CAMARA
        this.cameras.main.startFollow(this.player2, true, 0.09, 0.09);
        this.cameras.main.setZoom(2.5);

        //COLISIONS
        mapa.setCollisionBetween(0, 800, true, true, "ground");
        mapa.setCollisionBetween(0, 800, true, true, "die");
        this.physics.add.collider(this.player2, this.terra2);
        this.physics.add.collider(this.player2, this.dieLayer2, this.setMort, null, this);

        //AFEGIR QUE ES DETECTE L'ENTRADA DE LES FLETXES DEL TECLAT
        this.cursors = this.input.keyboard.createCursorKeys();

        //AFEGEIXO EL SCORE TEXT DALT A LA DRETA
        this.scoreText = this.add.text(380,260).setText('Score: '+this.score).setScrollFactor(0);

        //CREO LA PORTA DEL FINAL DEL JOC
        var door2 = this.physics.add.sprite(750,60,'door');
        door2.setScale(0.1);
        this.physics.add.collider(door2, this.terra2);
        this.physics.add.overlap(this.player2, door2, this.congratulations, null, this);

    }
    update()
    {
        if (this.cursors.left.isDown)
        {
            this.player2.setVelocityX(-160).setFlipX(true);

            this.player2.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player2.setVelocityX(160).setFlipX(false);

            if(this.cursors.up.isUp){
                this.player2.anims.play('right', true);
            }
        }
        else
        {
            this.player2.setVelocityX(0);

            this.player2.anims.play('turn');
        }
        if (this.cursors.up.isDown)
        {
            if(this.dobeljump < 1){
                if(this.player2.body.velocity.y >= 0){
                    this.player2.setVelocityY(-200);
                    this.dobeljump += 1;
                }
            }
        }
        if(this.player2.body.onFloor()){
            this.dobeljump = 0;
        }else{
            this.player2.anims.play('jumpy', true);
        }
    }
    setMort()
    {
        this.score -= 50;
        this.musicaLvl2.pause();
        if(this.vides-1 === 0){
            this.gameover();
        }else{
            this.scene.restart({score: this.score, vides: this.vides-1});
        }
    }
    takeCoin(player,coin)
    {
        this.coinSound2.play();
        this.score += 10;
        coin.disableBody(true,true);
        this.scoreText.setText('Score: '+ this.score);
    }
    congratulations()
    {
        this.musicaLvl2.stop();
        this.scene.start('gg', {score: this.score, vides: this.vides-1});        
    }
    gameover()
    {
        this.scene.start('gameover',{score: this.score, vides: this.vides-1});         
    }
}
export default SecondLvl;