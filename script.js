var config = {
    type: Phaser.AUTO,
    width: 800, //width do canvas
    height: 400, //height do canvas
    physics: {
        default: 'arcade'
    },
    scene: {
        // define functions para essas acoes basicas do phaser
        preload: preloadGame,
        create: createGame,
        update: updateGame
    }
};

var game = new Phaser.Game(config); // instancia o jogo com as configs acima

var cursor;
var p1;
var p2;
var ball;

var velocityX=Phaser.Math.Between(-100, 100);
var velocityY=100;

var pontosp1 = 0;
var pontosp2 = 0;
var pontosTextp1;
var pontosTextp2;


function preloadGame ()
 {
  this.load.image('chao','assets/chao.png');
  this.load.image('p1','assets/p1.png');
  this.load.image('p2','assets/p2.png');
  this.load.image('ball','assets/ball.png');
 }

function createGame ()
{
  this.add.image(400, 200, 'chao');


    cursor = this.input.keyboard.createCursorKeys();
    
    this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // mapeia keys
    this.keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // mapeia keys
    

    
    p1 = this.physics.add.sprite(780, 200, 'p1');// adiciona fisica a esse sprite
    p1.setCollideWorldBounds(true); // permite a colisao nos extremos do canvas
    
    
    p2=this.physics.add.sprite(20, 200, 'p2'); // adiciona fisica a esse sprite
    p2.setCollideWorldBounds(true); // permite a colisao nos extremos do canvas


    ball = this.physics.add.sprite(400, 200, 'ball');

    ball.setCollideWorldBounds(true);// permite a colisao nos extremos do canvas
    ball.setBounce(1); //tamanho da quicada

    //seta velocidade horizontal e vertical
    ball.setVelocityY(velocityY);
    ball.setVelocityX(velocityX);

    //Ao criar os sprites
    this.physics.add.collider(ball, p1, hitp1, null, this);
    this.physics.add.collider(ball, p2, hitp2, null, this);

    pontosTextp2 = this.add.text(16, 16, 'Pontos: 0', { fontSize: '16px', fill: '#F00' });
    pontosTextp1 = this.add.text(700, 16, 'Pontos: 0', { fontSize: '16px', fill: '#00F' });
    
}

function updateGame ()
{
//    funcao para atualizar o game em todo instante e acontecer movimentos
  if(cursor.up.isDown)
  {
    p1.setVelocityY(-150);
  }
  else if(cursor.down.isDown)
  {
    p1.setVelocityY(150);
  }
  else
  {
    p1.setVelocityY(0);
  }

  if(this.keyW.isDown)
  {
    p2.setVelocityY(-150);
  }
  else if(this.keyS.isDown)
  {
    p2.setVelocityY(150);
  }
  else
  {
    p2.setVelocityY(0);
  }

  if(ball.x>=790)
  {
    pontosp2 += 1;
    pontosTextp2.setText('Pontos: ' + pontosp2);
    reset();
    
  }

  if(ball.x<=10)
  {
    pontosp1 += 1;
    pontosTextp1.setText('Pontos: ' + pontosp1);
    reset();
    
    
  }

}

// se atingir o p1
function hitp1(ball,p1)
{
    velocityX=velocityX+50;
    velocityX=velocityX*-1;
  console.log(velocityX);
  
  ball.setVelocityX(velocityX);
  
  if(velocityY<0)
  {
      velocityY=velocityY*-1
      ball.setVelocityY(velocityY);
    }
    p1.setVelocityX(-1);
}

// se atingir o p2
function hitp2(ball,p2)
{
  velocityX=velocityX-50;
  velocityX=velocityX*-1;
  console.log(velocityX);
  ball.setVelocityX(velocityX);

  if(velocityY<0)
  {
    velocityY=velocityY*-1
    ball.setVelocityY(velocityY);
  }
  p2.setVelocityX(1);
}

// Reinicia o game
function reset()
{
  velocityX=Phaser.Math.Between(-100, 100);
  velocityY=100;
  ball.x=400;
  ball.y=200;
  p1.x=780;
  p1.y=200;
  p2.x=20;
  p2.y=200;
  ball.setVelocityX(velocityX);
  ball.setVelocityY(velocityY);
}