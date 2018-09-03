let wins = 0;
/*gameBody.innerHTML = `<p>Wins: ${wins}</p>`;*/

const won = document.querySelector('div');
const head = document.querySelector('h1');

// Enemies the player must avoid
class Enemy {
    // Variables applied to each of our instances go here,

    // The image/sprite for our enemies, this uses
    // a helper to load images
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.height = 30;
        this.width = 40;
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x >= 500) {
            this.x = -80
        }
    };


    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};



// player class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-cat-girl.png';
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 30;
    }
    update() {
        if (this.y <= -10) {
            this.y = 390;
            this.x = 200;
            wins++;
            won.innerHTML = `<h1>Wins: ${wins}</h1>`;
            head.style.display = 'none';
        }
        if (this.y >= 470) {
            this.y = 390;
            this.x = 200;
        }
        if (this.x >= 500 || this.x <= -100) {
            this.x = 200;
            this.y = 390;
        }
        for (let enemy of allEnemies) {

            if (this.x < (enemy.x + enemy.width) && (this.x + this.width) > enemy.x && this.y < (enemy.y + enemy.height) && (this.y + this.height) > enemy.y) {
                this.y = 390;
                this.x = 200;
            }
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    handleInput(dir) {
        switch (dir) {
            case 'right':
                this.update(this.x += 100);
                break;
            case 'left':
                this.update(this.x -= 100);
                break;
            case 'down':
                this.update(this.y += 83);
                break;
            case 'up':
                this.update(this.y -= 83);
                break;
        }
    }

}


//instantiate objects. All enemy objects are in an array
const allEnemies = [];
const enemy1 = new Enemy(-60, 60, Math.floor(Math.random() * 200) + 100);
const enemy2 = new Enemy(60, 60, Math.floor(Math.random() * 200) + 100);
const enemy3 = new Enemy(-140, 140, Math.floor(Math.random() * 200) + 100);
const enemy4 = new Enemy(140, 140, Math.floor(Math.random() * 200) + 100);
const enemy5 = new Enemy(-220, 220, Math.floor(Math.random() * 200) + 100);
const enemy6 = new Enemy(220, 220, Math.floor(Math.random() * 200) + 100);

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);



// Place the player object in a variable called player
const player = new Player(200, 390);

/*if (player.y <= -10) {
    console.log('win');
    wins++;
    para.innerHTML = `<p>Wins: </p> + wins`;
}*/

// This listens for key presses and sends the keys to Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});