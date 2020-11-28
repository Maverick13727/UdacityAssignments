# arcade-game
===============================

Please follow the [link] (https://www.youtube.com/watch?v=SxeHV1kt7iU&feature=youtu.be)
to the game video

## Getting Started with the game

* Open the **index.html** file in your browser to launch the game.
* The game contains a **player** and **enemy bugs**
* Use the arrow keys to move the player around the game canvas.
* Press the **Start** button to play The clock starts ticking.
* Player can move _left_, _right_, _up_ and _down_ using the arrow-keys.

## Game Rules

* If the player goes out of the game canvas, game is reset
* The game duration is **30 seconds**.The Player should try to accumulate maximum points within this time period
* If the player reaches the blue water without getting hit by the enemy bugs, earns **10 points**
* Player-Enemy collision deducts  **5 points** from the score and resets player to initial position

## About Source Code

The game is developed using **object-oriented JavaScript**.The code contains three
js files namely:
* _engine.js_ - This file provides the game loop functionality (update entities and render),
*             draws the initial game board on the screen, and then calls the update and
              render methods on the  player and enemy objects
* _resources.js_ - This is simply an image loading utility. It eases the process of loading
                 image files so that they can be used within your game. It also includes
                 a simple "caching" layer so it will reuse cached images if you attempt
                 to load the same image multiple times.
* _app.js_ - Contains implementation for Player, Enemy and Game classes, using
             Object-Oriented JavaScript.
