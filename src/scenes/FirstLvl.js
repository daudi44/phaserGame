import Phaser from 'phaser';
import tileImg from '../assets/terrainTiles.png';
import mapJson from '../assets/terrain.json';
import dude from '../assets/playerGB.png';
import coinImg from '../assets/coin3_16x16.png';
import spikesLarge from '../assets/SpikesLarge.png';
import spikesShort from '../assets/SpikesShort.png';
import door from '../assets/door.png';
import heart from '../assets/heart.png';

var player;
var cursors;
var terra;
var dieLayer;
var score;
var dobeljump = 0;
var scoreText;
var coins;
var vides = 3;
var hearts;


class FirstLvl extends Phaser.Scene
{    
    constructor ()
    {
        super('FirstLvl');
    }

    preload ()
    {
        this.load.spritesheet('dude', dude, { frameWidth: 16, frameHeight: 17 });
        this.load.image('tiles',tileImg);
        this.load.image('spikes',spikesLarge);
        this.load.image('spikesShort',spikesShort);
        this.load.image('door',door);
        this.load.image('heart',heart);
        this.load.spritesheet('coin',coinImg, { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('def_map',mapJson);
    }
      
    create (data)
    {
        this.vides = data.vides || 3;
        this.score = data.score || 0;

        this.dobeljump = 0;

        //DECLARO ELS LIMITS DE LA CAMARA
        this.cameras.main.setBounds(0, 0, 800, 640);

        //CREACIÓ DEL MAPA
        const mapa = this.make.tilemap({key: "def_map", tileHeight: 64, tileWidth: 64});
        const tileset = mapa.addTilesetImage('Terrain (32x32)','tiles');
        mapa.createLayer("Tile Layer 1", tileset, 0, 0);
        this.terra = mapa.createLayer("ground", tileset, 0, 0);
        this.dieLayer = mapa.createLayer("die",tileset,0,0);
        
        //JUGADOR I TAL
        this.player = this.physics.add.sprite(100, 600, 'dude');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(1.2);

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

        //DECLARO LES COLISIONS DEL TERRA I DE LO QUE TE MATA
        mapa.setCollisionBetween(0, 800, true, true, "ground");
        mapa.setCollisionBetween(0, 800, true, true, "die");
        this.physics.add.collider(this.player, this.terra);
        this.physics.add.collider(this.player, this.dieLayer, this.setMort, null, this);

        //DECLARO ELS PARAMETRES DE LA CAMARA
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setZoom(2.5);

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

        //AFEGEIXO EL SCORE TEXT DALT A LA DRETA
        this.scoreText = this.add.text(380,260).setText('Score: '+this.score).setScrollFactor(0);

        //AFEGIR QUE ES DETECTE L'ENTRADA DE LES FLETXES DEL TECLAT
        this.cursors = this.input.keyboard.createCursorKeys();

        //DECLARO LES MONEDES
        this.anims.create({
            key: 'flip',
            frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 13}),
            frameRate: 10,
            repeat: -1
        });

        this.coins = this.physics.add.group({
            key: 'coin',
            setXY:{x:1000,y:1000}
        });

        for(var i = 0; i < 14; i++){
            switch(i){
                case 0:
                    var moneda1 = this.coins.create(300,550)
                    moneda1.body.setAllowGravity(false)
                    moneda1.anims.play('flip', true)
                case 1:
                    var moneda2 = this.coins.create(590,430)
                    moneda2.body.setAllowGravity(false)
                    moneda2.anims.play('flip', true)
                case 2:
                    var moneda3 = this.coins.create(368,400)
                    moneda3.body.setAllowGravity(false)
                    moneda3.anims.play('flip', true)
                case 3:
                    var moneda4 = this.coins.create(240,350)
                    moneda4.body.setAllowGravity(false)
                    moneda4.anims.play('flip', true)
                case 4:
                    var moneda5 = this.coins.create(192,415)
                    moneda5.body.setAllowGravity(false)
                    moneda5.anims.play('flip', true)
                case 5:
                    var moneda6 = this.coins.create(79,330)
                    moneda6.body.setAllowGravity(false)
                    moneda6.anims.play('flip', true)
                case 6:
                    var moneda7 = this.coins.create(287,260)
                    moneda7.body.setAllowGravity(false)
                    moneda7.anims.play('flip', true)
                case 7:
                    var moneda8 = this.coins.create(496,260)
                    moneda8.body.setAllowGravity(false)
                    moneda8.anims.play('flip', true)
                case 8:
                    var moneda9 = this.coins.create(400,150)
                    moneda9.body.setAllowGravity(false)
                    moneda9.anims.play('flip', true)
                case 9:
                    var moneda10 = this.coins.create(200,150)
                    moneda10.body.setAllowGravity(false)
                    moneda10.anims.play('flip', true)
                case 10:
                    var moneda11 = this.coins.create(255,50)
                    moneda11.body.setAllowGravity(false)
                    moneda11.anims.play('flip', true)
                case 11:
                    var moneda11 = this.coins.create(485,50)
                    moneda11.body.setAllowGravity(false)
                    moneda11.anims.play('flip', true)
                
            }
            break;
        }
        this.physics.add.overlap(this.player, this.coins, this.takeCoin, null, this);

        //APARTAT SPAGHETTI CODE :)
        //SPIKES ALTS
        var spikes1 = this.physics.add.sprite(200, 190, 'spikes');
        spikes1.setScale(0.03);
        this.physics.add.collider(spikes1, this.terra);
        this.physics.add.overlap(this.player, spikes1, this.setMort, null, this);
        var spikes2 = this.physics.add.sprite(400, 190, 'spikes');
        spikes2.setScale(0.03);
        this.physics.add.collider(spikes2, this.terra);
        this.physics.add.overlap(this.player, spikes2, this.setMort, null, this);

        //SPIKES BAIXOS
        var spikesShort1 = this.physics.add.sprite(200, 100, 'spikesShort');
        spikesShort1.setScale(0.03);
        this.physics.add.collider(spikesShort1, this.terra);
        this.physics.add.overlap(this.player, spikesShort1, this.setMort, null, this);
        var spikesShort2 = this.physics.add.sprite(235, 100, 'spikesShort');
        spikesShort2.setScale(0.03);
        this.physics.add.collider(spikesShort2, this.terra);
        this.physics.add.overlap(this.player, spikesShort2, this.setMort, null, this);
        var spikesShort3 = this.physics.add.sprite(270, 100, 'spikesShort');
        spikesShort3.setScale(0.03);
        this.physics.add.collider(spikesShort3, this.terra);
        this.physics.add.overlap(this.player, spikesShort3, this.setMort, null, this);

        var spikesShort6 = this.physics.add.sprite(430, 100, 'spikesShort');
        spikesShort6.setScale(0.03);
        this.physics.add.collider(spikesShort6, this.terra);
        this.physics.add.overlap(this.player, spikesShort6, this.setMort, null, this);
        var spikesShort7 = this.physics.add.sprite(465, 100, 'spikesShort');
        spikesShort7.setScale(0.03);
        this.physics.add.collider(spikesShort7, this.terra);
        this.physics.add.overlap(this.player, spikesShort7, this.setMort, null, this);
        var spikesShort8 = this.physics.add.sprite(500, 100, 'spikesShort');
        spikesShort8.setScale(0.03);
        this.physics.add.collider(spikesShort8, this.terra);
        this.physics.add.overlap(this.player, spikesShort8, this.setMort, null, this);
        
        //CREO LA PORTA PER PASSAR AL SEGÜENT LVL
        // var door = this.physics.add.sprite(750,60,'door');
        var door = this.physics.add.sprite(200,550,'door');
        door.setScale(0.1);
        this.physics.add.collider(door, this.terra);
        this.physics.add.overlap(this.player, door, this.secondLvl, null, this);

    }
    update()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160).setFlipX(true);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160).setFlipX(false);

            if(this.cursors.up.isUp){
                this.player.anims.play('right', true);
            }
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown)
        {
            if(this.dobeljump < 1){
                if(this.player.body.velocity.y >= 0){
                    this.player.setVelocityY(-200);
                    this.dobeljump += 1;
                }
            }
        }
        if(this.player.body.onFloor()){
            this.dobeljump = 0;
        }else{
            this.player.anims.play('jumpy', true);
        }
    }
    setMort(){
        if(this.vides-1 === 0){
            this.score = 0;
            this.gameover();
        }else{
            this.score -= 50;
            this.scene.restart({score: this.score, vides: this.vides-1});
        }
    }
    gameover()
    {
        this.scene.start('gameover', {score: this.score, vides: this.vides-1});         
    }
    secondLvl(){               
        this.scene.start('SecondLvl', {score: this.score, vides: this.vides});   
    }
    congratulations()
    {
        this.scene.start('gg', {score: this.score, vides: this.vides-1});        
    }
    takeCoin(player,coin){
        this.score += 10;
        coin.disableBody(true, true);
        this.scoreText.setText('Score: '+ this.score);
    }
}

export default FirstLvl;