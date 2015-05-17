/* gomoku.AddRemoveGoPiece.js
 * Uses mouse clicks to place (or remove) Go pieces onto cell grid.
 *
 * Note:
 *		- Requires JQuery
 *		- The pieces are identified using unique 'turn' id's
 *		- The pieces are located using hashed XY-coordinate pairs
 */

var turn = 0;
var grid = $('html');
var spaceTaken = {};
$(document).click( function(e) {
var cellCoordArray = gridCoordinates(e.pageX, e.pageY); // Calculate exact cell location
var xPos = cellCoordArray[0];
var yPos = cellCoordArray[1];

   if (!(xPos + " " + yPos in spaceTaken)){ // Prevent multiple pieces in one cell
	   switch (e.which) {
			case 1: // Left click
				
			   if (turn % 2 === 0) { // Player 1: White pieces
					grid.append("<p id='"+turn+"' style='border: 1.5px solid red;height:12px;width:12px;border-radius:50%;background-color:white;position:absolute;top:"+yPos+"px;left:"+xPos+"px'></p>");
					$('#'+(turn-1)).css("border", "0");
					spaceTaken[xPos + " " + yPos] = "X";
				} else {			// Player 2: Black pieces
					grid.append("<p id='"+turn+"' style='border:1.5px solid red;height:12px;width:12px;border-radius:50%;background-color:black;position:absolute;top:"+yPos+"px;left:"+xPos+"px'></p>");
					$('#'+(turn-1)).css("border", "0");
					spaceTaken[xPos + " " + yPos] = "O";
				}
				
				var msg = winDetection(xPos, yPos, spaceTaken); // Winning move messages
				
				if (msg != ""){
					$('#msg').remove()
					grid.append("<h4 id='msg' style='background:white;color:black;position:absolute;top:"+1+"px;left:"+1+"px'>"+msg+"</h4>");
					$('#msg').fadeOut(4000);
				}
				turn += 1;						
				break;
			case 3: // Right click to delete last turn
				turn -= 1;
				var position = $('#'+turn).position();
				delete spaceTaken[position.left + " " + position.top];
				$('#'+turn).remove();
				break;
		}
	}
});
