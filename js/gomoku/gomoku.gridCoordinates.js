/* gomoku.gridCoordinates.js
 * Calculates the coordinates of the nearest grid cell.
 * Input: (x,y) mouse coordinates in pixels.
 * Returns: An array of adjusted coordinates in pixels,
 *			relative to the	centre of the nearest grid cell.
 * 
 * Note:
 *		- The size and shape of the game piece affects the grid 
 *		  coordinates
 */
 
function gridCoordinates(mouseX, mouseY){
   mouseX = Math.round((mouseX - 6)/ 10) * 10;
   mouseY = Math.round((mouseY - 25)/ 10) * 10;
   if ((mouseX/10)%2 == 0){
		mouseX += 2;
   } else {
		mouseX -= 8;
   }
   
   if ((mouseY/10)%2 === 0){
		mouseY += 6;
   } else {
		mouseY -= 4;
   }
   
   return [mouseX, mouseY];
}