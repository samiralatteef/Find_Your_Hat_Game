
const prompt = require('prompt-sync')({sigint: true});

// Constant Game Elements
const HAT = '^';
const HOLE = 'O';
const GRASS = '░';
const PLAYER = '*';

// Constants Game Scenarios (Messages)
const WIN = "Congratulations! You win!";                                                /* WIN */
const OUT_BOUND = "OOPS! You are out of the field. Try again.";                         /* OUT OF BOUNDS */
const INTO_HOLE = "OOPS! You fell into a hole. Try again.";                             /* FELL INTO HOLE */
const WELCOME = "Welcome to Find Your Hat game!";                                       /* START OF GAME WELCOME MESSAGE */
const DIRECTION = "Which direction: up(u), down(d), left(l) or right(r).";              /* KEYBOAD DIRECTIONS */
const QUIT = "Press quit(q) to exit."                                                   /* KEYBOARD TO QUIT THE GAME */
const END_GAME = "Game Ended. Thank you for playing!";                                  /* ENDED THE GAME */
const NOT_RECOGNISED = "Input not recognised.";                                         /* INPUT NOT RECOGNISED */

class Field {
  
        // constructor
        constructor(rows, cols){
                this.rows = rows;                       /* Property to set up the number of rows for the field */
                this.cols = cols;                       /* Property to set up the number of rows for the field */
                this.field = new Array([]) ;            /* Property that represents the field for game (2D array) */
                this.gamePlay = false                   /* Property to setup the game play (game status) */
                this.rowPlayer = 0;
                this.colPlayer = 0;
        }

        // Methods
        // Welcome Message
        static welcomeMsg(msg){
                console.log(
                        "\n*******************************\n" +
                        msg
                        + "\n*******************************\n"
                );
        }

        // TODO RANDOMISE THE FIELD WITH HAT, HOLE AND GRASS
        // * TODO THE NUMBER OF HOLES CREATED SHOULD PROVIDE SUFFICIENT CHALLENGE FOR THE GAME
        // * TODO THE HOLES SHOULD NOT BLOCK THE PLAYER FROM MOVING AT THE START OF THE GAME

        // Generate the game's field
        generateField(){
                
                for (let i = 0; i < this.rows; i++) {

                        this.field[i] = new Array();                                                    /* Generate field rows */
                        
                        
                        for (let j = 0; j < this.cols; j++) {                                           /* Generate field cols */

                                this.field[i][j] = Math.random() > percentage ? GRASS : HOLE;          /* Generate a randomised field */
                       
                        }

                }
        
        }

        printField(){                                                           /* Display the field */
                this.field.forEach((element) => {
                        console.log(element.join(""));
                })
        }

        // Start game
        startGame(){
                this.gamePlay = true;                                           /* Start the game */
                this.generateField(this.rows, this.cols);                       /* Generate the field first */
                this.field[0][0] = PLAYER;                                      /* Set the start position of the character */
                this.plantHat();                                                /* Plant the hat */
                this.printField();                                              /* Print the field once */
                this.updateGame();                                              /* Update the game once */
                
        }               


        // Update game
        updateGame(){

                // Obtain user input
                let userInput = "";

                // Get the user's direction
                do {
                        console.log(DIRECTION.concat(" ", QUIT));                        /* Request for the user's input */
                        userInput = prompt();                                            /* Get the user's input */

                        switch (userInput.toLowerCase()) {                              /* Update the position of the player */
                                case "u":
                                case "d":
                                case "l":
                                case "r":
                                       this.updatePlayer(userInput.toLowerCase());      /* user has pressed "u", "d", "l", "r" */
                                       break;
                                case "q":
                                        this.endGame();                                /* user has quit the game */
                                        break;
                                default:
                                        console.log(NOT_RECOGNISED);                  /* input not recognised */
                                        break;
                        }
                
                this.printField();                                                   /* Print field */

                } while (userInput.toLowerCase() !== "q");                          /* continue to loop if the player hasn't quit */

        }

        inBounds(ROWS, COLS) {            
        return (
            
            ROWS < 10 &&
            ROWS >= 0 &&
            COLS < 10 &&
            COLS >= 0
        );
    }

    plantHat() {

        let hatPlanted = 0;                                                     /* Plant the hat to a random position */

        if (hatPlanted == 0) {
            let hatRow = Math.floor(Math.random() * ROWS);
            let hatCol = Math.floor(Math.random() * COLS);;

            if (hatCol == 0 && hatRow == 0) {
                hatRow = Math.floor(Math.random() * ROWS);
                hatCol = Math.floor(Math.random() * COLS);
            }
            this.field[hatRow][hatCol] = HAT;
        }

    }

        // End game
        endGame(){
                console.log(END_GAME);                                          /* Inform the user the game has ended */
                this.gamePlay = false;                                          /* set gamePlay to false */
                process.exit();                                                 /* Quit the program */
        }

        // Update the player's movement and game condition
        updatePlayer(position){

                // ! TODO FOR THE ASSESSMENT
                // * TODO update the player's position in the field (must update first)
                // * TODO THEN check if the player has fallen into hole - if yes, LOSE and endGame()
                // * TODO THEN check if the player has gotten out of bounds - if yes (LOSE) and endGame()
                // * TODO THEN check if the player has found the hat - if yes (WIN) and endGame()

                const userInput = String(position).toLowerCase();

        let newRowPlayer = this.rowPlayer;
        let newColPlayer = this.colPlayer;

        switch (userInput.toLowerCase()) {
            case 'u':
                newRowPlayer--;
                break;
            case 'd':
                newRowPlayer++;
                break;
            case 'l':
                newColPlayer--;
                break;
            case 'r':
                newColPlayer++;
                break;
            default:
                console.log("Invalid input!");
                break;
        }

                console.log("player has moved: " + position);           /* Update user's position */

        if (this.field[newRowPlayer][newColPlayer] === HAT) {
            console.log(WIN);                                           /* When user has found the hat, log win and end game  */
            this.endGame();
        }


        if (!this.inBounds(newRowPlayer, newColPlayer)) {
            console.log(OUT_BOUND);                                    /* When user went out of bounds, inform user and end game  */
            this.endGame();
            return;
        }

        if (this.field[newRowPlayer][newColPlayer] === HOLE) {
            console.log(INTO_HOLE);                                    /* When user has fallen into a hole, inform user and end game  */
            this.endGame();
        }
       
        this.field[this.rowPlayer][this.colPlayer] = GRASS;            /* Update the user's previous position to grass */                                     
        this.rowPlayer = newRowPlayer;
        this.colPlayer = newColPlayer;
        this.field[this.rowPlayer][this.colPlayer] = PLAYER;                  

        }

}

// Static method to welcome the player
Field.welcomeMsg(WELCOME);

const ROWS = 10;                                                  /* The field will have 10 rows */
const COLS = 10;                                                  /* The field will have 10 columns */
const field = new Field(ROWS, COLS);                              /* Declaring and creating an instance of Field class */
const percentage = .1;                                            /* Percentage of holes */
field.startGame();                                                /* Start the game */
