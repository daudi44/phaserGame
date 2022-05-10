import Phaser from 'phaser';
import tileImg from '../assets/terrainTiles.png';
import mapJson from '../assets/terrain.json';
import dudeImg from '../assets/dude.png';

var player;
var cursors;
var terra;
var dieLayer;
class FirstLvl extends Phaser.Scene
{    
    constructor ()
    {
        super('FirstLvl');
    }

    preload ()
    {
        this.load.spritesheet('dude', dudeImg, { frameWidth: 32, frameHeight: 48 });
        this.load.image('tiles',tileImg);
        this.load.tilemapTiledJSON('def_map',mapJson);
    }
      
    create ()
    {
        //DECLARO ELS LIMITS DE LA CAMARA
        this.cameras.main.setBounds(0, 0, 800, 640);

        //CREACIÓ DEL MAPA
        const mapa = this.make.tilemap({key: "def_map", tileHeight: 64, tileWidth: 64});
        const tileset = mapa.addTilesetImage('Terrain (32x32)','tiles');
        mapa.createLayer("Tile Layer 1", tileset, 0, 0);
        this.terra = mapa.createLayer("ground", tileset, 0, 0);
        this.dieLayer = mapa.createLayer("die",tileset,0,0);
        
        //JUGADOR I TAL
        this.player = this.physics.add.sprite(100, 550, 'dude');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(.5);

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
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.onFloor())
        {
            this.player.setVelocityY(-200);
        }
    }
    setMort(){
        this.scene.start('FirstLvl');
    }
}

export default FirstLvl;