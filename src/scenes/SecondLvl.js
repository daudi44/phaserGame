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
var coins;
var vides = 3;
var hearts;

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
        this.load.spritesheet('coin',coinImg, { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('def_map2',mapJson2);

    }
    create(data)
    {
        this.vides = data.vides;
        this.score = data.score;

        //DECLARO ELS LIMITS DE LA CAMARA
        this.cameras.main.setBounds(0, 0, 800, 640);

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
        if(this.vides-1 === 0){
            this.score = 0;
            this.gameover();
        }else{
            this.score -= 50;
            this.scene.restart({score: this.score, vides: this.vides-1});
        }
    }
    takeCoin(coin)
    {
        this.score += 10;
        coin.disableBody(true,true);
    }
    gameover()
    {
        this.scene.start('gameover', {score: this.score, vides: this.vides-1});         
    }
}
export default SecondLvl;