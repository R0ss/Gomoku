/* gomoku.winDetection.js
 * Searches for all winning moves relative to the given x,y-coordinates.
 * Input: (x,y) mouse coordinates and a hash of current pieces in play.
 * Returns: A 'message' string containing information about the length 
 * and orientation of each winning move.
 * 
 * Note:
 *		- The hash uses the (x,y) coordinates of each piece as a key
 *		- Multiple messages are separated using '<br\>' tags
 *		- Each piece is 20px away from one another
 *		- '?' indicate opponent pieces
 */

function winDetection (mouseX, mouseY, spaceTaken){
	var horizontal = "";
	var vertical = "";
	var leftDiagonal = "";
	var rightDiagonal = "";
	var searchPiece = spaceTaken[mouseX + " " + mouseY];
	// Collect cell values of all 4 vectors that pass through selected cell
	for (j = -5; j <= 5; j++) {
		if ((mouseX+(20*j)) + " " + (mouseY+(20*j)) in spaceTaken){
			if (spaceTaken[(mouseX+(20*j)) + " " + (mouseY+(20*j))] === searchPiece){		// Left diagonal vector
				leftDiagonal = leftDiagonal.concat(searchPiece);
			} else {
				leftDiagonal = leftDiagonal.concat("?");
			}
		} else {
			leftDiagonal = leftDiagonal.concat(" ");
		}
		
		if ((mouseX-(20*j)) + " " + (mouseY+(20*j)) in spaceTaken){
			if (spaceTaken[(mouseX-(20*j)) + " " + (mouseY+(20*j))] === searchPiece){		// Right diagonal vector
				rightDiagonal = rightDiagonal.concat(searchPiece);
			} else {
				rightDiagonal = rightDiagonal.concat("?");
			}
		} else {
			rightDiagonal = rightDiagonal.concat(" ");
		}
		
		if ((mouseX+(20*j)) + " " + mouseY in spaceTaken){
			if (spaceTaken[(mouseX+(20*j)) + " " + mouseY] === searchPiece){				// Horizontal vector
				horizontal = horizontal.concat(searchPiece);
			} else {
				horizontal = horizontal.concat("?");
			}
		} else {
			horizontal = horizontal.concat(" ");
		}
		
		if (mouseX + " " + (mouseY+(20*j)) in spaceTaken){
			if (spaceTaken[mouseX + " " + (mouseY+(20*j))] === searchPiece){				// Vertical vector
				vertical = vertical.concat(searchPiece);
			} else {
				vertical = vertical.concat("?");
			}
		} else {
			vertical = vertical.concat(" ");
		}									
	}
	var lines = [vertical, horizontal, rightDiagonal, leftDiagonal]; // The order matters!
	var lineMsg = ['Vertical', 'Horizontal', 'Right diagonal', 'Left diagonal']; // The order matters!
	var X = searchPiece; // search piece can be X or O
	var msg = "";
	for (j = 0; j < 4; j++){
																// WIN CONDITIONS
		if (lines[j].search(X+X+X+X+X) > 0){
			msg = msg.concat(lineMsg[j] + ": 5 in a row<br\>");		// XXXXX
		} else if (lines[j].search(X+X+X+X+" ") > 0){
			msg = msg.concat(lineMsg[j] + ": 4 in a row<br\>");		// _XXXX
		}else if  (lines[j].search(" "+X+X+X+X) > 0){
			msg = msg.concat(lineMsg[j] + ": 4 in a row<br\>");		// XXXX_
		}else if (lines[j].search(X+" "+X+X+X) > 0){
			msg = msg.concat(lineMsg[j] + ": 4 in a row<br\>");		// X_XXX
		}else if (lines[j].search(X+X+" "+X+X) > 0){
			msg = msg.concat(lineMsg[j] + ": 4 in a row<br\>");		// XX_XX
		}else if (lines[j].search(X+X+X+" "+X) > 0){
			msg = msg.concat(lineMsg[j] + ": 4 in a row<br\>");		// XXX_X
		}else if (lines[j].search(" "+" "+X+X+X+" ") > 0){
			msg = msg.concat(lineMsg[j] + ": 3 in a row<br\>");		// __XXX_
		}else if (lines[j].search(" "+X+X+X+" "+" ") > 0){
			msg = msg.concat(lineMsg[j] + ": 3 in a row<br\>");		// _XXX__
		}else if (lines[j].search(" "+X+X+" "+X+" ") > 0){
			msg = msg.concat(lineMsg[j] + ": 3 in a row<br\>");		// _XX_X_
		}else if (lines[j].search(" "+X+" "+X+X+" ") > 0){
			msg = msg.concat(lineMsg[j] + ": 3 in a row<br\>");		// _X_XX_
		}
	}
	return msg;
}