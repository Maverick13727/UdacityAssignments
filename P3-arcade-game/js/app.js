///////////////////////Charater class and method definition :Superclass///////////////////////
var Character = function(imagePath,locX,locY) {
    //image
    this.sprite = imagePath
    //initial location
    this.x = locX;
    this.y = locY;
}
// Draw the player on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // drawBox(this.x+15,this.y+60,this.width,this.height, "yellow");
};

/////////////////////// Enemy Bot class and method definition///////////////////////
// Enemies our player must avoid
// Enemy constructor definition
var Enemy = function(locX,locY,width,height,speedFactor,image) {
    //call Character class in context of the Enemy class making the Enemy
    // subclass of Character
    Character.call(this,image,locX,locY)
    //start location of the enemy bot
    this.startLocX = locX;
    this.startLocY = locY;
    //update bug dimensions
    this.width = width;
    this.height = height;
    //bug speed factor.The factor is used as a variable in the
    //expression (speedFactor*dt* Math.random()) to vary the bug speed
    this.speedFactor = speedFactor;
};
//Making the character prototype part of enemy prototype chain
Enemy.prototype = Object.create(Character.prototype)
//Assigning the constructor
Enemy.prototype.constructor = Enemy
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //modify the position of the enemy bot
    this.x = this.x  +  (this.speedFactor*dt* Math.random());
    if (this.x > 505) {
      this.reset();
    }
    //check for collisions between enemy and bot
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.reset = function() {
    //modify the position of the enemy bot
    this.x = this.startLocX;
    this.y = this.startLocY;
};
// The function checks for collisions between bugs and players
Enemy.prototype.checkCollisions = function() {
    //when the bug is behind the enemy bot
    if (game.player.x > this.x) {
        if ((game.player.x - this.x)  < (this.width-10) && Math.abs(this.y - game.player.y) < game.player.height) {
            //decrease score by 5 points
            game.player.score -= 5;
            //update the DOM with score
            game.player.updateScore();
            //Reset the player back to the initiial position
            game.player.reset();
        }
    //when the bug is ahead of the player
    } else {
        if ((this.x - game.player.x) < (game.player.width-10) && Math.abs(this.y - game.player.y) < game.player.height) {
            game.player.score -= 5;
            game.player.updateScore();
            game.player.reset();
        }
    }
};
/////////////////////// Player class and method definition///////////////////////
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(locX,locY,width,height,stepMag,image) {
    //call Character class in context of the player class making the Player
    // subclass of Character
    Character.call(this,image,locX,locY)
    //start location of the player
    this.startLocX = locX;
    this.startLocY = locY;
    //update player dimensions
    this.width = width;
    this.height = height;
    //update player unit step magnitude
    this.stepMag = stepMag;
    //score variable
    this.score = 0;
};

//Making the character prototype part of enemy prototype chain
Player.prototype = Object.create(Character.prototype)
//Assigning the constructor
Player.prototype.constructor = Player
// Update the player position, required method for game
Player.prototype.update = function(incrX,incrY) {
    //modify the position of the player
    this.x = this.x + incrX;
    this.y = this.y + incrY;
    //check if player has crossed the winning lineWidth
    this.checkWinStatus();
    //check to ensure player remains within the canvas space.
    this.checkPlayerLimits();
};

//Resets the player position
Player.prototype.reset = function() {
    //modify the position of the player
    this.x = this.startLocX;
    this.y = this.startLocY;
};

// Draw the player on the screen, required method for game
Player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'left') {
      this.update(-1*this.stepMag,0);
    }
    if (keyCode == 'right') {
      this.update(this.stepMag,0);
    }
    if (keyCode == 'up') {
      this.update(0,-1*this.stepMag);
    }
    if (keyCode == 'down') {
      this.update(0,this.stepMag);
    }
};

//check Win status
Player.prototype.checkWinStatus = function() {
    if (this.y <= game.boardCroppedDim.top)  {
        //increase score by 10 points
        this.score +=  10;
        //update the DOM with score
        this.updateScore();
        //Reset the player back to the initiial position
        this.reset();
        // ctx.drawImage(Resources.get(player.win), player.x, 0);
    }
};
//check to ensure player remains within the canvas space.
Player.prototype.checkPlayerLimits = function() {
    var top = game.boardCroppedDim.top,
        left= game.boardCroppedDim.left,
        right = game.boardCroppedDim.right,
        bottom = game.boardCroppedDim.bottom;
    if (!( this.x >=left && this.x <= right) || !(this.y >= top  && this.y <= bottom)) {
      this.reset();
    }
};
//update the player score and score color accordingly.
Player.prototype.updateScore = function() {
    $('.score-val').text(this.score);
    if (game.player.score < 0) {
        $('.score-val').css('color','red');
    } else if (game.player.score > 0) {
        $('.score-val').css('color','blue');
    } else if (game.player.score === 0) {
        $('.score-val').css('color','black');
    }
};

/////////////////////// Game class and method definition///////////////////////
var Game = function  () {
//game attributes
    //canvas board dimensions
    this.boardCroppedDim = { top: 0, left: 0, right: 420, bottom: 400 };
    //game flag
    this.flag = 0
    this.timer = 30;
    this.canvasBlockWidth = 101,
    this.canvasBlockHeight = 83;
    //player attributes
    this.playerWidth = 70;
    this.playerHeight = 90;
    this.stepMag = this.canvasBlockHeight;
    this.playerStartXCoord = 150;
    this.playerStartYCoord = 400;
    this.playerImage = 'images/char-boy.png';
    // enemy bot attributes
    this.enemyBotWidth = 100;
    this.enemyBotHeight = 67;
    this.speedFactor = 275;
    this.enemyBotsNumber = 3;
    this.enemyImage = 'images/enemy-bug.png';
    //instructions
    this.rulesArr = [
        "Press the <strong>Start</strong> button to play.The clock starts ticking.",
        "Player can move <em>left, right, up</em> and <em>down</em> using the arrow-keys",
        "Enemies move in varying speeds on the paved block portion of the scene",
        "Player -enemy collision deducts score by 5 points and resets player to initial position",
        "If player reaches into water,it <strong><em>earns 10 points</em></strong>",
        "The Game can be resarted by pressing <strong>Restart</strong> button after completing a game"
    ];
    this.displayRules();
};
//Instantiate Enemy Bots Objects
Game.prototype.addEnemies = function () {
    this.allEnemies = [];
    for (var i = 1; i <= this.enemyBotsNumber; i+=1) {
        var obj_enemy = new Enemy(10,(this.canvasBlockHeight*i) - 15,this.enemyBotWidth,this.enemyBotHeight,this.speedFactor,this.enemyImage);
        this.allEnemies.push(obj_enemy);
    }
};
//Instantiate Player Object
Game.prototype.addPlayers = function () {
    //Instantiate player instance
    this.player = new Player(this.playerStartXCoord,this.playerStartYCoord,this.playerWidth,this.playerHeight,this.stepMag,this.playerImage);
};
//Method to Start the game. Display Start screen, reset score , timer and initialize timer clock
Game.prototype.startGame = function () {
    //initialize game flag
    this.flag = 1;
    //render player for the first time
    this.player.render();
    //put the canvas
    $('.main').css('display', 'block');
    $('.end').css('display', 'none');
    //Reset the timer
    this.timer = 30;
    $('.time-val').text(this.timer)
    //Reset the score to 0
    this.player.score = 0;
    this.player.updateScore();
    //readjust  font colors
    $('.time-val').css('color','black');
    $('.score-val').css('color','black');
    setTimeout(function() {
        //initiaize the clock
        this.initializeClock('timer');
    }.bind(this), 1000);
};
//Method to stop the game.Display game-over screen
Game.prototype.stopGame = function () {
    //initialize game flag
    this.flag = 0
    //Put the end screen
    $('.main').css('display', 'none');
    $('.end').css('display', 'block');
    //display final score
    $('.final-score-val').text(this.player.score);
};
//Intialize Clock. we use setInterval to manage the timer.
Game.prototype.initializeClock = function (id) {
    var clock = document.getElementById(id);
    var timeinterval = setInterval(function(){
        this.timer -= 1
        clock.innerHTML = this.timer;
        if(this.timer<=0){
            clearInterval(timeinterval);
            this.stopGame();
        } else if (this.timer >=0 && this.timer <=10) {
            $('.time-val').css('color','red');
        }
    }.bind(this),1000);
}
//Method to display game-rules
Game.prototype.displayRules = function () {
    for (i = 0; i < this.rulesArr.length; i++) {
          var strLine = "<li class='rule-line'>" + this.rulesArr[i] + "</li>";
          $(".rules-lst:last").append(strLine);
    }
}

///////////////////////Helper methods///////////////////////
//The function draws a rectangle
function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    game.player.handleInput(allowedKeys[e.keyCode]);
});
//This listens for mouse clicks and outputs x and y page co-ordinate of the mouse click
document.addEventListener('click', function(e) {
    // console.log(e.pageX);
    // console.log(e.pageY);
});
//Create the game
var game = new Game();
//adding players
game.addPlayers();
//adding enemies
game.addEnemies();
// Invoke the game
$(".button-start").click(function () {
    if(game.flag == 0){
        game.startGame();
    }
});
//Restart the game
$(".button-restart").click(function () {
    //Reset time
    $('.time-val').text(30);
    $('.time-val').css('color','black');
    //Reset score
    $('.score-val').text(0);
    $('.score-val').css('color','black');
    //Display start game screen and hide the game-over screen
    $('.main').css('display', 'block');
    $('.end').css('display', 'none');
});
