        // global variables that enable ajax to send and recieve leaderboard scores
        var turn = 0;
        var counter = 0;
        var nameO;
        var nameX;
        var winner;
        var score;
        
            $(document).ready(function(){
                // hides the button that displays the leaderboard
                $("#kowabunga").hide();
                // displays the date
                var year = new Date().getFullYear();
                var month = new Date().getMonth();
                var day = new Date().getDate();
                var hours = new Date().getHours();
                var minutes = new Date().getMinutes();
                hours = addZero(hours);
                minutes = addZero(minutes);
                
                var date = year + "/" + month + "/" + day + "/" + hours + ":" + minutes;
                document.getElementById("demo").innerHTML = date;
                function addZero(i) {
                    if (i < 10) {
                    i = "0" + i;
                    }
                    return i;
                }
                // variable for rows
                var row = 8;
                // variables for columns
                var column = 8;
                // two dimensional for loop, first dimension adds rows and the second adds cells
                for(var i = 0; i < row; i++)
                {
                    $("<tr/>").appendTo("#game tbody");
                    for(var j = 0; j < column; j++)
                    {
                        $("<td id='id" + i + j + "'class='checkerboard'></td>").appendTo("#game tbody");
                    }
                }
                // for loop that adds in the game pieces
                for(var k = 0; k < row; k++)
                {
                    for(var l = 0; l < column; l++)
                    {
                        if (k < 3) {

                            if (l % 2 === 0 && k === 0)
                            {
                                document.getElementById("id" + k + l).innerHTML = "O";
                            }
                            if (l % 2 === 1 && k === 1)
                            {
                                document.getElementById("id" + k + l).innerHTML = "O";
                            }
                            if (l % 2 === 0 && k === 2)
                            {
                                document.getElementById("id" + k + l).innerHTML = "O";
                            }
                        }
                        else if (k > 4)
                        {
                            if (l % 2 === 1 && k === 5)
                            {
                                document.getElementById("id" + k + l).innerHTML = "X";
                            }
                            if (l % 2 === 0 && k === 6)
                            {
                                document.getElementById("id" + k + l).innerHTML = "X";
                            }
                            if (l % 2 === 1 && k === 7)
                            {
                                document.getElementById("id" + k + l).innerHTML = "X";  
                            }
                            
                            
                            
                        }     
                    }
                    
                }
                // main click function that enables
                $("#game tbody td").click(function(){
                    // one part of the toggle, at least color changes with each click
                    color();
                    // gets id of where ever you click
                    var id = $(this).attr('id');
                    
                    // get contents of where you click
                    var XO = $(this).text();

                    // if the turn counter is odd then X's turn
                    if(isOdd(turn))
                    {
                        if (XO == "X" || XO == "XK")
                        {
                            xoMatrix(XO, id);
                            
                        }

                    }
                    // if even then O's turn
                    else
                    {
                        if  (XO == "O" || XO == "OK")
                        {
                            xoMatrix(XO, id);

                        }
                        
                    }
                    // resets id don't really remember why and am too scared to get rid of it rn
                    id = "";
                    
             });
            //scoreboard generator
             $("#kowabunga").click(function() {
                $.get("databaseConnector.php", { playerName1:nameO, playerName2:nameX, winner:winner, date:date, score:score}).done(function(data){
                        $("#div1").html(data);
                }); 

             });
             
            });
             // function that does mostly everything after selection
             function xoMatrix(identity, id) {
                // counts up on turn
                counter++;
                // splits string up so you can get id numbers for calculating
                var splitString = id.split('');
                var newRow;
                var newColLeft;
                var newColRight;
                var down;
                var up;
                var right;
                var left;
                // calculates mvement options
                up = Number(splitString[2]) - 1;
                down = Number(splitString[2]) + 1;
                right = Number(splitString[3]) + 1;
                left = Number(splitString[3]) - 1;
                
                if (identity == "O")
                {
                    // number that represents the row that piece will be moving to
                    newRow = Number(splitString[2]) + 1;
                }
                if (identity == "X")
                {
                    newRow = Number(splitString[2]) - 1;
                }
                // number that represets the option to move right
                newColRight = Number(splitString[3]) + 1;
                // number that represents the option to move left
                newColLeft = Number(splitString[3]) - 1;
                // call for function that checks if there is hopable spaces
                
                /* this section manages the king piece movements
                 * recieves information from click that you are moviing
                 * Then checks to see if any potential movement schemes fall outside of bounds which would cause an run-time error
                 * Then once it is verified whether the king piece is located near any of the 4 walls of the board or in one of the four corners
                 * then it activates a method that generates the red squares in one of the four squares around the piece
                 */
                if(identity == "OK" || identity == "XK")
                {
                    
                    if(up > 7 || up <= -1)
                    {
                        
                        up = "";
                    }
                    if (down > 7 || down <= -1 )
                    {
                        
                        down = "";
                    }
                    if (right > 7 || right <= -1 )
                    {

                        right = "";
                        
                    }
                    if (left > 7 || left <= -1 )
                    {
                        left = "";
                    }
                    // four axel king movement
                    if (up !== "" && down !== "" && left !== "" && right !== "")
                    {
                        movementModule(true, true, true, true, splitString, identity);
                        
                    }
                    // top wall movement
                    else if (up === "" && right !== "" && left !== "")
                    {
                        movementModule(true, true, false, false, splitString, identity);
                    }
                    // bottom wall movement
                    else if(down === "" && right !== "" && left !== "")
                    {
                        movementModule(false, false, true, true, splitString, identity);
                    }
                    // right wall movement
                    else if(right === "" && up !== "" && down !== "")
                    {
                        movementModule(true, false, false, true, splitString, identity);
                    }
                    // left wall movement
                    else if(left === "" && up !== "" && down !== "")
                    {
                        movementModule(false, true, true, false, splitString, identity);
                    }
                    // upper left corner 
                    else if(up === "" && left === "")
                    {
                        movementModule(false, true, false, false, splitString, identity);
                    }
                    // upper right corner
                    else if(up === "" && right === "")
                    {
                        movementModule(true, false, false, false, splitString, identity);
                    }
                    // bottom left corner
                    else if(down === "" && left === "")
                    {
                        movementModule(false, false, true, false, splitString, identity);
                        
                    }
                    // bottom right corner
                    else if (down === "" && right === "")
                    {
                        movementModule(false, false, false, true, splitString, identity);
                    }
                    
                }
                /*
                 *This section manages non king pieces
                 */
                
                if (newRow < 0 || newRow >= 8)
                {

                    newRow = "";
                }
                
                if (newColLeft < 0 || newColLeft >= 8)
                {

                    newColLeft = "";

                }
                if (newColRight < 0 || newColRight >= 8)
                {

                    newColRight = "";
                    
                }
                // for the right side movement
                
                if (newColRight !== "" && newRow !== "")
                {
                    var rightIdentity;
                    var splitter2;
                    var aheadRightRow;
                    var aheadRightCol;
                    var lookAhead;
                    var lookAheadContents;
                    var moveRight = "id" + newRow + newColRight;
                    // For o
                    if (identity == "O")
                    {
                    if(document.getElementById(moveRight).innerHTML == "O") // not letting o override another o
                    {
                        moveRight = null;
                    }
                    
                    // toggling color
                    if(!isOdd(counter))
                    {
                        color(); 
                    }
                    // what runs if you decide to move(or not, I could not figure out how to take off click events)
                    else
                    {
                        
                        if (moveRight !== null)
                        {
                            // helps you determine what's already there
                            rightIdentity = document.getElementById(moveRight).innerHTML;
                            
                            // these remaining varibale determine if a hop is available
                            splitter2 = moveRight.split('');
                            
                            aheadRightRow = Number(splitter2[2]) + 1;
                            aheadRightCol = Number(splitter2[3]) + 1;
                            lookAhead = "id" + aheadRightRow + aheadRightCol;
                            // makes sure you don't go out of bounds and crash
                            if(aheadRightCol == "8" || aheadRightRow == "8")
                            {
                                lookAhead = "";
                                lookAheadContents = "X";
                                
                            }
                            // if everything goes ok then you get to move
                            else{
                                lookAheadContents = document.getElementById(lookAhead).innerHTML;
                            }
                            // only activates if move is acceptable and then hops over opponent
                            if (rightIdentity == "X" && lookAheadContents !== "X" && lookAheadContents !== "O")
                            {
                                // sprays colors and gernates click event
                                document.getElementById(moveRight).style.borderColor = "red";
                                document.getElementById(lookAhead).style.borderColor = "red";
                                document.getElementById(moveRight).onclick = function() {
                                while(identity == "O")
                                {
                                    
                                    movement(moveRight, "Right", "O", "A");
                                    color();
                                    moveRight = "";
                                    moveLeft = "";
                                }
                            };
                            }
                            // if it's an empty space then it's normal movement
                            else if (rightIdentity === "")
                            {

                                document.getElementById(moveRight).style.borderColor = "red";
                                document.getElementById(moveRight).onclick = function() {
                                while(identity == "O")
                                {
                                    movement(moveRight, "Right", "O", "P");
                                    color();
                                    moveRight = "";
                                    moveLeft = "";
                                }
                            };
                            }
                        
                        }
                        
                    }
                    }
                    //For x
                    if (identity == "X")
                    {
                    if(document.getElementById(moveRight).innerHTML == "X") // not letting x override another x
                    {
                        moveRight = null;
                    }
                    if(isOdd(counter))
                    {
                        color();  
                    }
                    else
                    {
                        if(moveRight !== null)
                        {
                            
                            rightIdentity = document.getElementById(moveRight).innerHTML;
                            splitter2 = moveRight.split('');
                            aheadRightRow = Number(splitter2[2]) - 1;
                            aheadRightCol = Number(splitter2[3]) + 1;
                            lookAhead = "id" + aheadRightRow + aheadRightCol;
                            
                            if(aheadRightRow == -1 || aheadRightCol == 8)
                            {
                                lookAhead = "";
                                lookAheadContents = "O";
                            }
                            else {
                                lookAheadContents = document.getElementById(lookAhead).innerHTML;
                            }
                            
                            if (rightIdentity == "O" && lookAheadContents !== "O" && lookAheadContents !== "X")
                            {
                                document.getElementById(moveRight).style.borderColor = "yellow";
                                document.getElementById(lookAhead).style.borderColor = "yellow";
                                
                                document.getElementById(moveRight).onclick = function() {
                                while(identity == "X")
                                {
                                    movement(moveRight, "Right", "X", "A");
                                    color();
                                    moveRight = "";
                                    moveLeft = "";
                                }
                            };
                            }
                            
                            else if (rightIdentity === "")
                            {
                            document.getElementById(moveRight).style.borderColor = "yellow";
                            document.getElementById(moveRight).onclick = function() {
                            while (identity == "X")
                                {
                                    
                                movement(moveRight, "Right", "X", "P");
                                color();
                                moveRight = "";
                                moveLeft = "";
                                }
                            };
                            }
                        }
                            
                    }
                    
                }
                }
                // For the left side movement
                if (newRow !== "" && newColLeft !== "")
                {
                    var LeftIdentity;
                    var splitter2L;
                    var aheadLeftRow;
                    var aheadLeftCol;
                    var lookAheadL;
                    var lookAheadContentsL;
                    var moveLeft = "id" + newRow + newColLeft;
                    
                    if (identity == "O")
                    {
                        
                    if(document.getElementById(moveLeft).innerHTML == "O") // not letting o override another o
                        {
                            moveLeft = null;
                        }
                        
                    if(!isOdd(counter))
                        {
                            color();
                        }
                        
                    else
                    {
                       
                        if(moveLeft !== null)
                        {
                            
                            LeftIdentity = document.getElementById(moveLeft).innerHTML;
                            splitter2L = moveLeft.split('');
                            aheadLeftRow = Number(splitter2L[2]) + 1;
                            aheadLeftCol = Number(splitter2L[3]) - 1;
                            lookAheadL = "id" + aheadLeftRow + aheadLeftCol;

                            if(aheadLeftRow == 8 || aheadLeftCol == -1)
                            {
                                lookAheadL = "";
                                lookAheadContentsL = "X";
                            }
                            else {
                                lookAheadContentsL = document.getElementById(lookAheadL).innerHTML;
                            }
                            
                            if (LeftIdentity == "X" && lookAheadContentsL !== "X" && lookAheadContentsL !== "O")
                            {
                                
                                document.getElementById(moveLeft).style.borderColor = "red";
                                document.getElementById(lookAheadL).style.borderColor = "red";
                                document.getElementById(moveLeft).onclick = function() {
                                while(identity == "O")
                                {
                                    movement(moveLeft, "Left", "O", "A");
                                    color();
                                    moveRight = "";
                                    moveLeft = "";
                                }
                            };
                            }
                            
                            else if(LeftIdentity === "")
                            {
                                // shows the user that this is an option to select
                                document.getElementById(moveLeft).style.borderColor = "red";
                                document.getElementById(moveLeft).onclick = function() {
                                    while(identity == "O")
                                    {
                                        movement(moveLeft, "Left", "O", "P");
                                        color();
                                        moveLeft = "";
                                        moveRight = "";
                                    }
                                
                            };
                            }
                            

                        }
                    }
                        
                    }
                    if (identity == "X")
                    {
                        if(document.getElementById(moveLeft).innerHTML == "X") // not letting x override another x
                            {
                            moveLeft = null;
                        }
                        if(isOdd(counter))
                        {
                            color();
                        }
                        else
                        {
                            if(moveLeft !== null)
                            {
                                LeftIdentity = document.getElementById(moveLeft).innerHTML;
                                splitter2L = moveLeft.split('');
                                aheadLeftRow = Number(splitter2L[2]) - 1;
                                aheadLeftCol = Number(splitter2L[3]) - 1;
                                lookAheadL = "id" + aheadLeftRow + aheadLeftCol;
                                
                                if(aheadLeftRow == -1 || aheadLeftCol == -1)
                                {
                                
                                    lookAheadL = "";
                                    lookAheadContentsL = "O";
                                }
                                else {
                                    
                                    lookAheadContentsL = document.getElementById(lookAheadL).innerHTML;
                                }
                                if (LeftIdentity == "O" && lookAheadContentsL !== "O" && lookAheadContentsL !== "X")
                                {
                                    document.getElementById(moveLeft).style.borderColor = "yellow";
                                    document.getElementById(lookAheadL).style.borderColor = "yellow";
                                    document.getElementById(moveLeft).onclick = function() {
                                    while(identity == "X")
                                    {
                                        
                                            movement(moveLeft, "Left", "X", "A");
                                            color();
                                            moveRight = "";
                                            moveLeft = "";
                                        }
                                        };
                                }
                                else if(LeftIdentity === "") {

                                document.getElementById(moveLeft).style.borderColor = "yellow";
                                document.getElementById(moveLeft).onclick = function() {
                                while(identity == "X")
                                {
                                    movement(moveLeft, "Left", "X", "P");
                                    color();
                                    moveLeft = "";
                                    moveRight = "";
                                }
                                
                            };
                            }
                            }
                            
                        }
                        
                        
                    }
                }
                
                }
            /* function that enables movement
             * direction is the id that enables you to move
             * text is which way you are headed
             * piece is which type of piece you have
             */ 
             function movement(direction, text, piece, style) {
                var listOfChar = direction.split('');
                var row = listOfChar[2];
                var col = listOfChar[3];
                var oldRow;
                var oldCol;
                var oppDeathRow;
                var oppDeathCol;
                
                    if (text == "Left")
                        {
                            
                            if(piece == "O")
                                {
                                    if (style == "P")
                                    {
                                        oldRow = Number(row) - 1;
                                    }
                                    if (style == "A")
                                    {
                                        oldRow = Number(row) - 1;
                                        oppDeathRow = Number(row);
                                        row = Number(row) + 1;
                                    }
                                    
                                }
                            if(piece == "X")
                                {

                                    if (style == "P")
                                    {
                                    oldRow = Number(row) + 1;
                                    }
                                    if (style == "A")
                                    {
                                        
                                        oldRow = Number(row) + 1;
                                        oppDeathRow = Number(row);
                                        row = Number(row) - 1;
                                    }
                                }
                            if (style == "P")
                            {
                                oldCol = Number(col) + 1;
                            }
                            if (style == "A")
                            {
                                oldCol = Number(col) + 1;
                                oppDeathCol = Number(col);
                                col = Number(col) - 1;
                                
                            }
                        }
                     if (text == "Right")
                        {
                            
                
                            if(piece == "O")
                                {
                                    if (style == "P")
                                    {
                                        oldRow = Number(row) - 1;
                                    }
                                    if (style == "A")
                                    {
                                        
                                        oldRow = Number(row) - 1;
                                        oppDeathRow = Number(row);
                                        row = Number(row) + 1;
                                        
                                        
                                    }
                                    
                                }
                            if(piece == "X")
                                {
                                    
                                    if (style == "P")
                                    {
                                        oldRow = Number(row) + 1;
                                    }
                                    if (style == "A")
                                    {
                                        
                                        oldRow = Number(row) + 1;
                                        oppDeathRow = Number(row);
                                        row = Number(row) - 1;
                                        
                                    }
                                }
                            if (style == "P")
                            {
                            oldCol = Number(col) - 1;
                            }
                            if (style == "A")
                            {
                                oldCol = Number(col) - 1;
                                oppDeathCol = Number(col);
                                col = Number(col) + 1;
                                
                            }
                        }
                var oldId = "id" + oldRow + oldCol;
                document.getElementById(oldId).innerHTML = "";
                if (style == "A")
                {
                    var oppDeath = "id" + oppDeathRow + oppDeathCol;

                    document.getElementById(oppDeath).innerHTML = "";
                }
                
                
                var newId = "id" + row + col;
                if (piece == "O") {
                    document.getElementById(newId).innerHTML = "O";
                    uTasteVictoryM8();
                    xGonGiveItToYa();
                }
                if (piece == "X")
                {
                    document.getElementById(newId).innerHTML = "X";
                    uTasteVictoryM8();
                    xGonGiveItToYa();
                }
                turn++;
                document.getElementById("twist").innerHTML = turn;
                if (isOdd(turn))
                {
                    document.getElementById("turn").innerHTML = "X's turn<br>";
                }
                else
                {
                    document.getElementById("turn").innerHTML = "O's turn<br>";
                }
                //upgrades to king pieces
                if (row == "0")
                {
                    document.getElementById(newId).innerHTML = "XK";
                }
                
                if (row == "7")
                {
                    document.getElementById(newId).innerHTML = "OK";
                    
                }
                
             }
             // resets colors all across board
             function color(){
                var x = document.getElementsByTagName('td');
                for(i=0;i<x.length;i++) {
                    x[i].style.borderColor = "rgb(89, 142, 175)";
                }
            }
            // checks if number is odd, used for toggling and turns
            function isOdd(num) { return num % 2;}
            // very similar to regular movement function just specialized for kings
            function kinglyMovement(d,e,f,h)
            {
                
                var listOfKinglyChars = d.split("");
                var rowKing = listOfKinglyChars[2];
                var colKing = listOfKinglyChars[3];

                var oldRowKing;
                var oldColKing;
                var oppDeathColK;
                var oppDeathRowK;
                if (f == "OK")
                {
                    if (e == "downRight")
                        {
                            if (h == "Passive")
                            {
                                oldRowKing = Number(rowKing) - 1;
                                oldColKing = Number(colKing) - 1;
                            }
                            if (h == "Aggressive")
                            {
                                
                                oldRowKing = Number(rowKing) - 1;
                                oldColKing = Number(colKing) - 1;
                                oppDeathRowK = Number(rowKing);
                                oppDeathColK = Number(colKing);
                                rowKing = Number(rowKing) + 1;
                                colKing = Number(colKing) + 1;
                                
                            }
                            
                        }
                     if (e == "upRight")
                        {
                            if(h == "Passive")
                            {
                                oldRowKing = Number(rowKing) + 1;
                                oldColKing = Number(colKing) - 1; 
                            }
                            if (h == "Aggressive")
                            {
                                oldRowKing = Number(rowKing) + 1;
                                oldColKing = Number(colKing) - 1;
                                oppDeathRowK = Number(rowKing);
                                oppDeathColK = Number(colKing);
                                rowKing = Number(rowKing) - 1;
                                colKing = Number(colKing) + 1;
                            }
                            
                        }
                    if (e == "upLeft")
                        {
                            if (h == "Passive")
                            {
                                oldRowKing = Number(rowKing) + 1;
                                oldColKing = Number(colKing) + 1; 
                            }
                            if (h == "Aggressive")
                            {
                                
                                oldRowKing = Number(rowKing) + 1;
                                oldColKing = Number(colKing) + 1;
                                oppDeathRowK = Number(rowKing);
                                oppDeathColK = Number(colKing);
                                rowKing = Number(rowKing) - 1;
                                colKing = Number(colKing) - 1;
                            }
                            
                        }
                    if (e == "downLeft")
                        {
                            if (h == "Passive")
                            {
                                oldRowKing = Number(rowKing) - 1;
                                oldColKing = Number(colKing) + 1; 
                            }
                            if (h == "Aggressive")
                            {
                                oldRowKing = Number(rowKing) - 1;
                                oldColKing = Number(colKing) + 1;
                                oppDeathRowK = Number(rowKing);
                                oppDeathColK = Number(colKing);
                                rowKing = Number(rowKing) + 1;
                                colKing = Number(colKing) - 1;
                            }
                            
                            
                        }
                }
                if (f == "XK")
                {
                    if (e == "downRight")
                        {
                            if (h == "Passive")
                            {
                                oldRowKing = Number(rowKing) - 1;
                                oldColKing = Number(colKing) - 1;
                            }
                            
                            if (h == "Aggressive")
                            {
                                oldRowKing = Number(rowKing) - 1;
                                oldColKing = Number(colKing) - 1;
                                oppDeathRowK = Number(rowKing);
                                oppDeathColK = Number(colKing);
                                rowKing = Number(rowKing) + 1;
                                colKing = Number(colKing) + 1;
                                
                            }
                            
                            
                        }
                     if (e == "upRight")
                        {
                            if (h == "Passive")
                            {
                                oldRowKing = Number(rowKing) + 1;
                                oldColKing = Number(colKing) - 1; 
                            }
                            if (h == "Aggressive")
                            {
                                oldRowKing = Number(rowKing) + 1;
                                oldColKing = Number(colKing) - 1;
                                oppDeathRowK = Number(rowKing);
                                oppDeathColK = Number(colKing);
                                rowKing = Number(rowKing) - 1;
                                colKing = Number(colKing) + 1;
                            }
                            
                        }
                    if (e == "upLeft")
                        {
                            if (h == "Passive")
                            {
                                oldRowKing = Number(rowKing) + 1;
                                oldColKing = Number(colKing) + 1; 
                            }
                            
                            if (h == "Aggressive")
                            {
                                oldRowKing = Number(rowKing) + 1;
                                oldColKing = Number(colKing) + 1;
                                oppDeathRowK = Number(rowKing);
                                oppDeathColK = Number(colKing);
                                rowKing = Number(rowKing) - 1;
                                colKing = Number(colKing) - 1;
                            }
                            
                        }
                    if (e == "downLeft")
                        {
                            if (h == "Passive")
                            {
                                oldRowKing = Number(rowKing) - 1;
                                oldColKing = Number(colKing) + 1; 
                            }
                            if (h == "Aggressive")
                            {
                                
                                
                                oldRowKing = Number(rowKing) - 1;
                                oldColKing = Number(colKing) + 1;
                                oppDeathRowK = Number(rowKing);
                                oppDeathColK = Number(colKing);
                                rowKing = Number(rowKing) + 1;
                                colKing = Number(colKing) - 1;
                                
                            }
                            
                        }
                }

                var oldIdKing = "id" + oldRowKing + oldColKing;

                document.getElementById(oldIdKing).innerHTML = "";
                if (h == "Aggressive")
                {
                    var oppDeath = "id" + oppDeathRowK + oppDeathColK;
                    document.getElementById(oppDeath).innerHTML = "";
                }
                
                
                var newIdKing = "id" + rowKing + colKing;


                if (f == "OK") {
                    document.getElementById(newIdKing).innerHTML = "OK";
                    uTasteVictoryM8();
                    xGonGiveItToYa();
                }
                if (f == "XK")
                {
                    document.getElementById(newIdKing).innerHTML = "XK";
                    uTasteVictoryM8();
                    xGonGiveItToYa();
                }
                turn++;
                document.getElementById("twist").innerHTML = turn;
                if (isOdd(turn))
                {
                    document.getElementById("turn").innerHTML = "X's turn<br>";
                }
                else
                {
                    document.getElementById("turn").innerHTML = "O's turn<br>";
                }
            }
            
            // modularized code to aid in selection for king pieces, it's the equivilent of the XO matrix and is housed inside the XO matrix
            // grants the ability to hop over pieces
            // it used to be shorter but the hop functionality which was added last minute tripled the size of this section and I did not have time to redesign
            function movementModule(dl, dr, ur, ul, progenitor, OX) {
                up = Number(progenitor[2]) - 1;
                down = Number(progenitor[2]) + 1;
                right = Number(progenitor[3]) + 1;
                left = Number(progenitor[3]) - 1;
                var i;
                        if (dl) {
                            
                            var newMoveDownLeft = "id" + down + left;
                            var identityDL = document.getElementById(newMoveDownLeft).innerHTML;
                            var lookAheadDL = "id" + (down + 1) + (left - 1);
                            var lookAheadDLContents;
                            if((down + 1) == "8" || (left - 1) == "-1")
                            {
                                lookAheadDL = "";
                                lookAheadDLContents = "X";
                                
                            }
                            else{
                                lookAheadDLContents = document.getElementById(lookAheadDL).innerHTML;
                            }
                            if (OX == "OK")
                            {
                                if (identityDL == "X" && lookAheadDLContents !== "O" && lookAheadDLContents !== "X")
                                {
                                    document.getElementById(newMoveDownLeft).style.borderColor = "red";
                                    document.getElementById(lookAheadDL).style.borderColor = "red";
                                    if (newMoveDownLeft !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveDownLeft).onclick = function() {

                                            kinglyMovement(newMoveDownLeft, "downLeft", OX, "Aggressive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                
                                else if(identityDL === "")
                                {
                                    
                                    if(document.getElementById(newMoveDownLeft).innerHTML == "O" || document.getElementById(newMoveDownLeft).innerHTML == "OK") // not letting o override another o
                                    {
                                        newMoveDownLeft = null;
                                    }
                                else {
                                        document.getElementById(newMoveDownLeft).style.borderColor = "red";
                                        if (newMoveDownLeft !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveDownLeft).onclick = function() {
                                            kinglyMovement(newMoveDownLeft, "downLeft", OX, "Passive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                }

                                
                                

                            }
                            
                            else if (OX == "XK")
                            {
                                
                                if (identityDL == "O" && lookAheadDLContents == "O" && lookAheadDLContents == "X")
                                {
                                    document.getElementById(newMoveDownLeft).style.borderColor = "yellow";
                                    document.getElementById(lookAheadDL).style.borderColor = "yellow";
                                        if (newMoveDownLeft !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveDownLeft).onclick = function() {

                                            kinglyMovement(newMoveDownLeft, "downLeft", OX, "Aggressive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                    
                                }

                                
                                else if(identityDL === "")
                                    {
                                        if(document.getElementById(newMoveDownLeft).innerHTML == "X" || document.getElementById(newMoveDownLeft).innerHTML == "XK") // not letting o override another o
                                            {
                                                newMoveDownLeft = null;
                                        }
                                    else
                                    {
                                        document.getElementById(newMoveDownLeft).style.borderColor = "yellow";
                                        if (newMoveDownLeft !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveDownLeft).onclick = function() {
                                            kinglyMovement(newMoveDownLeft, "downLeft", OX, "Passive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                    }
                                    }
                                
                                
                                
                            }
                            
                            
                        }
                                                    
                            
                        if (dr) {
                            
                            var newMoveDownRight = "id" + down + right;
                            var identityDR = document.getElementById(newMoveDownRight).innerHTML;
                            var lookAheadDR = "id" + (down + 1) + (right + 1);
                            var lookAheadDRContents;
                            
                            if((down + 1) == "8" || (right + 1) == "8")
                                {
                                    lookAheadDR = "";
                                    lookAheadDRContents = "X";
                                
                            }
                            else
                            {
                                
                                lookAheadDRContents = document.getElementById(lookAheadDR).innerHTML;
                            }
                            if (OX == "OK")
                            {
                            if (identityDR == "X" && lookAheadDRContents !== "O" && lookAheadDRContents !== "X")
                                {
                                    
                                    document.getElementById(newMoveDownRight).style.borderColor = "red";
                                    document.getElementById(lookAheadDR).style.borderColor = "red";
                                    if (newMoveDownRight !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            
                                            document.getElementById(newMoveDownRight).onclick = function() {
                                                
                                            kinglyMovement(newMoveDownRight, "downRight", OX, "Aggressive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                else if(identityDR === "")
                                {
                                    
                                    if(document.getElementById(newMoveDownRight).innerHTML == "O" || document.getElementById(newMoveDownRight).innerHTML == "OK") // not letting o override another o
                                    {
                                        newMoveDownRight = null;
                                    }
                                else {
                                        document.getElementById(newMoveDownRight).style.borderColor = "red";
                                        if (newMoveDownRight !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveDownRight).onclick = function() {
                                            kinglyMovement(newMoveDownRight, "downRight", OX, "Passive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                }
                                

                            }
                            else if (OX == "XK")
                            {
                                if (identityDR == "O" && lookAheadDRContents !== "O" && lookAheadDRContents !== "X")
                                {
                                    document.getElementById(newMoveDownRight).style.borderColor = "yellow";
                                    document.getElementById(lookAheadDR).style.borderColor = "yellow";
                                    if (newMoveDownRight !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveDownRight).onclick = function() {

                                            kinglyMovement(newMoveDownRight, "downRight", OX, "Aggressive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                else if(identityDR === "")
                                {
                                    
                                    if(document.getElementById(newMoveDownRight).innerHTML == "X" || document.getElementById(newMoveDownRight).innerHTML == "XK") // not letting o override another o
                                    {
                                        newMoveDownRight = null;
                                    }
                                else {
                                        document.getElementById(newMoveDownRight).style.borderColor = "yellow";
                                        if (newMoveDownRight !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveDownRight).onclick = function() {
                                            kinglyMovement(newMoveDownRight, "downRight", OX, "Passive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                }
                                
                            }
                            
                        }
                        if (ur) {
                            
                            var newMoveUpRight = "id" + up + right;
                            var identityUR = document.getElementById(newMoveUpRight).innerHTML;
                            var lookAheadUR = "id" + (up - 1) + (right + 1);
                            var lookAheadURContents;
                            
                            if((right + 1) == "8" || (up - 1) == "-1")
                                {
                                    lookAheadUR = "";
                                    lookAheadURContents = "X";
                                
                            }
                            else
                            {
                                
                                lookAheadURContents = document.getElementById(lookAheadUR).innerHTML;
                            }
                            if (OX == "OK")
                            {
                                if (identityUR == "X" && lookAheadURContents !== "O" && lookAheadURContents !== "X")
                                {
                                    document.getElementById(newMoveUpRight).style.borderColor = "red";
                                    document.getElementById(lookAheadUR).style.borderColor = "red";
                                    if (newMoveUpRight !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveUpRight).onclick = function() {

                                            kinglyMovement(newMoveUpRight, "upRight", OX, "Aggressive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                else if(identityUR === "")
                                {
                                    
                                    if(document.getElementById(newMoveUpRight).innerHTML == "X" || document.getElementById(newMoveUpRight).innerHTML == "XK") // not letting o override another o
                                    {
                                        newMoveUpRight = null;
                                    }
                                else {
                                        document.getElementById(newMoveUpRight).style.borderColor = "red";
                                        if (newMoveUpRight !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveUpRight).onclick = function() {
                                            kinglyMovement(newMoveUpRight, "upRight", OX, "Passive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                }
                                
                                

                            }
                            else if (OX == "XK")
                            {
                                if (identityUR == "O" && lookAheadURContents !== "O" && lookAheadURContents !== "X")
                                {
                                    document.getElementById(newMoveUpRight).style.borderColor = "yellow";
                                    document.getElementById(lookAheadUR).style.borderColor = "yellow";
                                    if (newMoveUpRight !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveUpRight).onclick = function() {

                                            kinglyMovement(newMoveUpRight, "upRight", OX, "Aggressive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                else if(identityUR === "")
                                {
                                    
                                    if(document.getElementById(newMoveUpRight).innerHTML == "X" || document.getElementById(newMoveUpRight).innerHTML == "XK") // not letting o override another o
                                    {
                                        newMoveUpRight = null;
                                    }
                                else {
                                        document.getElementById(newMoveUpRight).style.borderColor = "yellow";
                                        if (newMoveUpRight !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveUpRight).onclick = function() {
                                            kinglyMovement(newMoveUpRight, "upRight", OX, "Passive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                }
                                
                                
                            }
                            
                            
                             
                        }
                        if (ul) {
                            var newMoveUpLeft = "id" + up + left;
                            var identityUL = document.getElementById(newMoveUpLeft).innerHTML;
                            var lookAheadUL = "id" + (up - 1) + (left - 1);
                            var lookAheadULContents;
                            
                            if((left - 1) == "-1" || (up - 1) == "-1")
                                {
                                    lookAheadUL = "";
                                    lookAheadULContents = "X";
                                
                            }
                            else
                            {
                                
                                lookAheadULContents = document.getElementById(lookAheadUL).innerHTML;
                            }
                            if (OX == "OK")
                            {
                                if (identityUL == "X" && lookAheadULContents !== "O" && lookAheadULContents !== "X")
                                {
                                    document.getElementById(newMoveUpLeft).style.borderColor = "red";
                                    document.getElementById(lookAheadUL).style.borderColor = "red";
                                    if (newMoveUpLeft !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveUpLeft).onclick = function() {

                                            kinglyMovement(newMoveUpLeft, "upLeft", OX, "Aggressive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                else if(identityUL === "")
                                {
                                    
                                    if(document.getElementById(newMoveUpLeft).innerHTML == "X" || document.getElementById(newMoveUpLeft).innerHTML == "XK") // not letting o override another o
                                    {
                                        newMoveUpLeft = null;
                                    }
                                else {
                                        document.getElementById(newMoveUpLeft).style.borderColor = "red";
                                        if (newMoveUpLeft !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveUpLeft).onclick = function() {
                                            kinglyMovement(newMoveUpLeft, "upLeft", OX, "Passive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                }
                                

                                
                            }
                            else if (OX == "XK")
                            {
                                if (identityUL == "O" && lookAheadULContents !== "O" && lookAheadULContents !== "X")
                                {
                                    document.getElementById(newMoveUpLeft).style.borderColor = "yellow";
                                    document.getElementById(lookAheadUL).style.borderColor = "yellow";
                                    if (newMoveUpLeft !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveUpLeft).onclick = function() {

                                            kinglyMovement(newMoveUpLeft, "upLeft", OX, "Aggressive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveDownRight = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                else if(identityUL === "")
                                {
                                    
                                    if(document.getElementById(newMoveUpLeft).innerHTML == "X" || document.getElementById(newMoveUpLeft).innerHTML == "XK") // not letting o override another o
                                    {
                                        newMoveUpLeft = null;
                                    }
                                else {
                                        document.getElementById(newMoveUpLeft).style.borderColor = "yellow";
                                        if (newMoveUpLeft !== null)
                                        {
                                        // for loop that stops the function from running when you click on an empty space but only lets you through on the first time
                                        for (i = 0; i < 2; i++)
                                        {
                                            document.getElementById(newMoveUpLeft).onclick = function() {
                                            kinglyMovement(newMoveUpLeft, "upLeft", OX, "Passive");
                                            color();
                                            newMoveUpRight = "";
                                            newMoveUpLeft = "";
                                            newMoveUpLeft = "";
                                            newMoveDownLeft = "";
                                            };
                                        }
                                     }
                                }
                                }
                               
                                
                            }
                            
                            
                            
                        
                        }
                        
            }
            
            // checks if O won the game
            function uTasteVictoryM8()
            {
                var XinThere = false;
                var myNameIsIdentifiedItsThatArray = [];
                for (var r = 0; r < 8; r++)
                {
                    for(var c = 0; c < 8; c++)
                    {
                        myNameIsIdentifiedItsThatArray.push("id" + r + c);
                    }
                }
                
                for (r = 0; r < myNameIsIdentifiedItsThatArray.length; r++)
                {
                    var catcher = myNameIsIdentifiedItsThatArray[r];
                    var caught = document.getElementById(catcher).innerHTML;
                    if(caught == "X")
                    {
                        XinThere = true;
                        
                    } 
                }
                if(!XinThere)
                {
                    
                    alert("O won");
                    $("button").show();
                    nameO = document.getElementById("name1").value;
                    nameX = document.getElementById("name2").value;
                    winner = nameO;
                    score = scoreCalculator();
                    
                }
            }
            // checks if X won the game
            function xGonGiveItToYa() {
               var OinThere = false;
                var myNameIsIdentifiedItsThatArray = [];
                for (var r = 0; r < 8; r++)
                {
                    for(var c = 0; c < 8; c++)
                    {
                        myNameIsIdentifiedItsThatArray.push("id" + r + c);
                    }
                }
                
                for (r = 0; r < myNameIsIdentifiedItsThatArray.length; r++)
                {
                    var catcher = myNameIsIdentifiedItsThatArray[r];
                    var caught = document.getElementById(catcher).innerHTML;
                    if(caught == "O")
                    {
                        OinThere = true;
                        
                    } 
                }
                if(!OinThere)
                {
                    alert("X won, he gon give it to ya");
                    $("button").show();
                    nameO = document.getElementById("name1").value;
                    nameX = document.getElementById("name2").value;
                    winner = nameX;
                    score = scoreCalculator();
                    }
            }
            // calculates a simple score
            function scoreCalculator() {
                var turnNumber = document.getElementById("twist").innerHTML;
                var points4Winning = 100;
                var pointsAwarded = 0;
                
                if (turnNumber >= 1 && turnNumber <= 10)
                {
                    pointsAwarded = 1000;
                }
                if (turnNumber >= 11 && turnNumber <= 20)
                {
                    pointsAwarded = 900;
                }
                if (turnNumber >= 21 && turnNumber <= 30)
                {
                    pointsAwarded = 800;
                }
                
                if (turnNumber >= 31 && turnNumber <= 40)
                {
                    pointsAwarded = 700;
                }
                
                if (turnNumber >= 41 && turnNumber <= 50)
                {
                    pointsAwarded = 600;
                }
                
                if (turnNumber >= 51 && turnNumber <= 60)
                {
                    pointsAwarded = 500;
                }
                if (turnNumber >= 61)
                {
                    pointsAwarded = 400;
                }
                
                var total = points4Winning + pointsAwarded;
                return total;
                
            }