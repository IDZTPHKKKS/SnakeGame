const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext("2d");
let scoreBoard = document.getElementById('scoreBoard');
let scoreMax = document.getElementById("max-score");

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const APPLE_WIDTH = 25;
let size=4;
let apple_X;
let apple_Y;
let xVel=25;
let yVel=0;
let flag = 0;
let score = 0;


let snake = [
    {x:3*(APPLE_WIDTH),y:0},
    {x:2*(APPLE_WIDTH),y:0},
    {x:APPLE_WIDTH,y:0},
    {x:0,y:0}

];
window.addEventListener('keydown',keyPress)
function startGame(){
    clearGrid();
    context.fillStyle = '#212121';
    context.fillRect(0,0,500,500);
    createApple();
    displayApple();
    /*createSnake();
    moveSnake();
    clearGrid();
    createSnake();*/
    timer();
}
function clearGrid(){
    context.fillStyle = '#212121';
    context.fillRect(0,0,500,500);
}
function createApple()/*creates an apple randomly at a particular location,we assign a variable apple_X and apple_Y for the x and y coordinates for the
randomly generated apple*/{
    apple_X=Math.floor(Math.random()*WIDTH/APPLE_WIDTH)*APPLE_WIDTH;
    apple_Y=Math.floor(Math.random()*HEIGHT/APPLE_WIDTH)*APPLE_WIDTH;
}

function displayApple()
{
    context.fillStyle = 'red';
    context.fillRect(apple_X/*should be multiples of 25 to accomodate space for snake*/,apple_Y/*should be multiples of 25 to accomodate space for snake*/,APPLE_WIDTH,APPLE_WIDTH);
}

startGame();

function createSnake(){
    context.fillStyle ='#0FFF50';
    context.strokeStyle = '#212121';
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,APPLE_WIDTH,APPLE_WIDTH)
        context.strokeRect(snakePart.x,snakePart.y,APPLE_WIDTH,APPLE_WIDTH)
    })
}
function moveSnake(){
     const snakeHead = {x:snake[0].x + xVel,
                        y:snake[0].y + yVel}
                        snake.unshift(snakeHead)
                        if(snake[0].x == apple_X && snake[0].y == apple_Y)
                        {
                            size++;
                            score++;
                            scoreBoard.textContent=score;
                            createApple();
                        

                        }
                        else 
                          snake.pop();

}
localStorage.setItem("scoreMax",6);
localStorage.getItem("scoreMax");
function gameOver()
{
    if(snake[0].x >=WIDTH || snake[0].x <0 || snake[0].y>=HEIGHT || snake[0].y <0 || flag==1)
    {
        clearGrid();
        context.font='bold 50px VT323';
        context.fillStyle = "White";
        context.textAlign = "center";
        context.fillText("Game Over!!",WIDTH/2,HEIGHT/2);
        
    }
}

function gameOver2(){
    for(i=2;i<size;i++)
    {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {
            flag = 1;
            break;
        }
    }
    gameOver();
    
}
function timer(){
    setTimeout(()=>{
        clearGrid();
        displayApple();
        moveSnake();
        createSnake();
        gameOver();
        gameOver2();
        timer();
    },120)
}
function keyPress(event){
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    const SPACE = 32
    
    switch(true)
    {
        
        case(event.keyCode==LEFT  && xVel!=APPLE_WIDTH):
        xVel=-APPLE_WIDTH;
        yVel=0;
        break;
        
        case(event.keyCode==RIGHT && xVel!=-APPLE_WIDTH):
        xVel=APPLE_WIDTH;
        yVel=0;
        break;

        case(event.keyCode==UP && yVel!=APPLE_WIDTH ):
        xVel=0;
        yVel=-APPLE_WIDTH;
        break;

        case(event.keyCode==DOWN && yVel!=-APPLE_WIDTH):
        xVel=0;
        yVel=APPLE_WIDTH;
        break;

        case(event.keyCode==65  && xVel!=APPLE_WIDTH):
        xVel=-APPLE_WIDTH;
        yVel=0;
        break;
        
        case(event.keyCode==68 && xVel!=-APPLE_WIDTH):
        xVel=APPLE_WIDTH;
        yVel=0;
        break;

        case(event.keyCode==87 && yVel!=APPLE_WIDTH ):
        xVel=0;
        yVel=-APPLE_WIDTH;
        break;

        case(event.keyCode==83 && yVel!=-APPLE_WIDTH):
        xVel=0;
        yVel=APPLE_WIDTH;
        break;
        

        case(event.keyCode==SPACE):
        startGame();


    }

}