//function main(){
//let canvas=document.createElement("canvas");
//document.body.appendChild(canvas);

//ctx.drawImage(1,2,3,4,5,6,7,8,9);
//1 parameter is the image object
//2 and 3 parameter are for coordinates within image
//4 and 5 are for ending coordinates in image relative to 2 and 3. so origin at 2 and 3
//6 and 7 are for coordinates in canvas to print the image
//8 and 9 are for setting the width and height of image

//canvas to draw board and pieces
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//canvas to draw possible moves
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

//canvas to draw dead pieces outside the board
//let canvas3 = document.getElementById("canvas3");
//let ctx3 = canvas3.getContext("2d");

//board color
const lightColor="#cccccc";
const darkColor="#333333";

//possible moves circle color
const circleColor = "#207e40";

const redColor = "#cd3737";

//based on screen width and height
let unit;

//based on image width and height
let imgUnit=60;

let flip;

let pieces = [];

//setting position of chess board
if(innerWidth >= innerHeight){
	unit = Math.floor(innerHeight/8);
	canvas.style.left = (innerWidth-innerHeight)/2 + "px";
	canvas.style.top = 0 + "px";

	canvas2.style.left = (innerWidth-innerHeight)/2 + "px";
	canvas2.style.top = 0 + "px";
}
else{
	unit = Math.floor(innerWidth/8);
	canvas.style.top = (innerHeight-innerWidth)/2 + "px";
	canvas.style.left = 0 + "px";

	canvas2.style.top = (innerHeight-innerWidth)/2 + "px";
	canvas2.style.left = 0 + "px";
}

//setting size of chess board
canvas.width = unit*8;
canvas.height = unit*8;

canvas2.width = unit*8;
canvas2.height = unit*8;
/*
//canvas 3
canvas3.style.top = 0 + "px";
canvas3.style.left = 0 + "px";

canvas3.width = innerWidth;
canvas3.height = innerHeight;
*/


//creating pieces
let wk = new King(1,1,unit*4,unit*7,1);
let bk = new King(1,0,unit*3,0,1);

let wq = new QueenRookBishop(0,1,unit*3,unit*7,1,1);
let bq = new QueenRookBishop(0,0,unit*4,0,1,1);

let wr1 = new Rook2(2,1,0,unit*7,1,2);
let wr2 = new Rook2(2,1,unit*7,unit*7,1,2);
let br1 = new Rook2(2,0,0,0,1,2);
let br2 = new Rook2(2,0,unit*7,0,1,2);

let wb1 = new QueenRookBishop(4,1,unit*2,unit*7,1,3);
let wb2 = new QueenRookBishop(4,1,unit*5,unit*7,1,3);
let bb1 = new QueenRookBishop(4,0,unit*2,0,1,3);
let bb2 = new QueenRookBishop(4,0,unit*5,0,1,3);

let wn1 = new Knight(3,1,unit,unit*7,1);
let wn2 = new Knight(3,1,unit*6,unit*7,1);
let bn1 = new Knight(3,0,unit,0,1);
let bn2 = new Knight(3,0,unit*6,0,1);

let wp = []
for(let i=0;i<8;i++){
	wp.push(new Pawn(5,1,unit*i,unit*6,1));
}

let bp = []
for(let i=0;i<8;i++){
	bp.push(new Pawn(5,0,unit*i,unit,1));
}

//pieces = [wk,bk,wq,bq,wr1,wr2,br1,br2,wb1,wb2,bb1,bb2,wn1,wn2,bn1,bn2,wp,bp];

pieces = [bk,bq,br1,br2,bb1,bb2,bn1,bn2,bp[0],bp[1],bp[2],bp[3],bp[4],bp[5],bp[6],bp[7],wk,wq,wr1,wr2,wb1,wb2,wn1,wn2,wp[0],wp[1],wp[2],wp[3],wp[4],wp[5],wp[6],wp[7]];

//new better piece organization, you can easily push new piece at end and king position won't change at all
let bpiece = [];
bpiece = [bk,bq,br1,br2,bb1,bb2,bn1,bn2,bp[0],bp[1],bp[2],bp[3],bp[4],bp[5],bp[6],bp[7]];

let wpiece = [];
wpiece = [wk,wq,wr1,wr2,wb1,wb2,wn1,wn2,wp[0],wp[1],wp[2],wp[3],wp[4],wp[5],wp[6],wp[7]];

let piece = [];
//piece = [bpiece, wpiece];
//piece.push(bpiece);
//piece.push(wpiece);
piece = [
	[bk,bq,br1,br2,bb1,bb2,bn1,bn2,bp[0],bp[1],bp[2],bp[3],bp[4],bp[5],bp[6],bp[7]],
	[wk,wq,wr1,wr2,wb1,wb2,wn1,wn2,wp[0],wp[1],wp[2],wp[3],wp[4],wp[5],wp[6],wp[7]],
];



//initializing
wn1.moves = [{x:0,y:unit*5},{x:unit*2,y:unit*5}];
wn2.moves = [{x:unit*5,y:unit*5},{x:unit*7,y:unit*5}];

for(let i=0;i<8;i++){
	wp[i].moves.push({x:wp[i].x,y:wp[i].y - unit});
	wp[i].moves.push({x:wp[i].x,y:wp[i].y - unit*2});
}



//drawing the chess board
for(let i=0;i<8;i++){
	/*
	if(i%2 == 0){
		flip=0;
	}
	else{
		flip=1;
	}
	*/
	flip = i%2 == 0 ? 0 : 1;
	
	for(let j=0;j<8;j++){
		/*
		if(j%2 == flip){
			ctx.fillStyle="#cccccc";
		}
		else{
			ctx.fillStyle="#333333";
		}
		*/
		ctx.fillStyle = (j%2 == flip) ? lightColor : darkColor;
		ctx.fillRect(unit*j,unit*i,unit*(j+1),unit*(i+1));

		/*
		ctx.strokeStyle="black";
		ctx.moveTo(unit*j,unit*i);
		ctx.lineTo(unit*(j+1),unit*i);
		ctx.lineWidth=unit;
		ctx.stroke();
		*/
	}
}

//drawing all pieces for the first time in their initial position
p.onload = function(){
	for(let i=0;i<pieces.length;i++){
		pieces[i].draw();
	}
}



let playerTurn=1;
let selectOrMove = 1;

let color1; //square color of selected piece
let color2; //square color where selected piece is gonna go
let square1; //selected piece's square coordinates
let square2; //coordinates of square where piece will go

let selectedPiece;
let capturedPiece;
let isNewInMoves;

let redSquare = {};

let numberOfPiecesCaptured = [0,0];

canvas2.addEventListener("click",clickedOnBoard);

/*
//function is in style of guard clauses, return, break, continue
function clicked(event){
	if(selectOrMove == 0){
		square1 = whichSquare(event.offsetX,event.offsetY);
		//x and clientX would not work here after board was placed in center

		selectedPiece = whichPieceAt(square1[0],square1[1]);
		//console.log(selectedPiece);
		if(selectedPiece == 0){
			return;
		}
		
		selectedPiece.findPossibleMoves();
		if(selectedPiece.moves.length == 0){
			return;
		}
		
		selectedPiece.selected = 1;
		selectedPiece.drawPossibleMoves();
		selectOrMove = 1;
		//console.log(foundBox1[0],foundBox1[1]);
		//console.log(selected.selected);
	}
	else{
		square2 = whichSquare(event.offsetX,event.offsetY);

		//if piece was deselected
		if(square2[0]==square1[0] && square2[1] == square1[1]){
			selectedPiece.selected = 0;
			ctx2.clearRect(0,0,canvas.width,canvas.height);
			//console.log(1);
			selectOrMove = 0;
			return;
		}

		//if not in piece's nature to move there then again select some other proper square for the same piece
		isNewPossible = selectedPiece.isNewPossible(square2[0],square2[1]);
		if(isNewPossible == 0){
			//console.log(12);
			return;
		}

		capturedPiece = whichPieceAt(square2[0],square2[1]);
		if(capturedPiece && capturedPiece.color == selectedPiece.color){
			//alert("that's your family!");
			//console.log("capturedPiece : " + capturedPiece);
			//console.log(15);
			return;
		}
		if(capturedPiece){
			capturedPiece.alive = 0;
			//console.log(11);

			color2 = whichColorSquare(square2[0],square2[1]);
			fillColor(square2[0],square2[1],color2);
		}

		//console.log(10);
		color1 = whichColorSquare(square1[0],square1[1]);
		fillColor(square1[0],square1[1],color1);

		selectedPiece.update(square2[0],square2[1]);
		selectedPiece.draw();

		ctx2.clearRect(0,0,canvas.width,canvas.height);
		//console.log(2);
		selectedPiece.selected=0;
		selectOrMove = 0;
	}
}
*/

//function is in style of if, else if, else statements
function clickedOnBoard(event) {
	//console.log(selectOrMove);
	if(selectOrMove == 1){
		
		//selectAPiece(event.offsetX,event.offsetY);
		square1 = whichSquare(event.offsetX,event.offsetY);
		selectedPiece = whichPieceAt(square1[0],square1[1]);
		if(selectedPiece != 0){
			
			if(selectedPiece.color == playerTurn){
//    			if(selectedPiece.alive == 1){
//	    			selectedPiece.findPossibleMoves();
					if(selectedPiece.moves.length != 0){
						
						selectedPiece.drawPossibleMoves();
						//selectedPiece.selected = 1;
						selectOrMove = 2;
					}
//				}
			}
		}
	}
	else if(selectOrMove == 2){
		
		square2 = whichSquare(event.offsetX,event.offsetY);
		if(square2[0] != square1[0] || square2[1] != square1[1]) {
			
			isNewInMoves = selectedPiece.isNewInMoves(square2[0],square2[1]);
			if(isNewInMoves != 0) {
				
				capturedPiece = whichPieceAt(square2[0],square2[1]);
				if(capturedPiece != 0) {
					
					color2 = whichColorSquare(square2[0],square2[1]);
					fillColor(square2[0],square2[1],color2);
					capturedPiece.alive = 0;
					
					/*
					//drawing captured piece outside the board
					numberOfPiecesCaptured[(!playerTurn)]++;
					capturedPiece.update((!playerTurn)*unit*12,numberOfPiecesCaptured[(!playerTurn)]*unit);
					ctx3.drawImage(p,capturedPiece.img.x,capturedPiece.img.y,imgUnit,imgUnit,capturedPiece.x,capturedPiece.y,unit,unit);
					*/
				}
				ctx2.clearRect(0,0,canvas.width,canvas.height);

				color1 = whichColorSquare(square1[0],square1[1]);
				fillColor(square1[0],square1[1],color1);

				selectedPiece.update(square2[0],square2[1]);
				selectedPiece.draw();

				//selectedPiece.selected=0;
				selectOrMove = 1;
				playerTurn = playerTurn?0:1;

				//removing red square of king
				if(pieces[(!playerTurn)*16].inCheck >= 1){
					let c = whichColorSquare(redSquare.x,redSquare.y);
					fillColor(redSquare.x,redSquare.y,c);
					if(redSquare.x == pieces[(!playerTurn)*16].x){
						pieces[(!playerTurn)*16].draw();
					}
				}

				//weHaveAWinner(1);
				//console.log(piece[0].length);



				//resetting
				for(let i=0 ; i<pieces.length ; i++){
					pieces[i].moves = [];
					if(i == 0 || i == 16){
						pieces[i].inCheck = 0;
						pieces[i].checkPath = [];
					}
					else{
						pieces[i].isPinned = 0;
						pieces[i].isProtected = 0;
						pieces[i].pinnedPath = [];
					}
				}



				console.log(11111);
				//find possible moves of all pieces
				
				pieces[(!playerTurn)*16].findMovesAfterMyTurn();

				for(let i=(!playerTurn)*16 + 1; i<(!playerTurn)*16 + 16 ; i++){
					if(pieces[i].alive){
						pieces[i].findMovesAfterMyTurn();
					}
				}

				//playerTurn pieces moves
				
				let temp = [];
				
				for(let i=playerTurn*16 + 1 ; i<playerTurn*16 + 16 ; i++){
					if(pieces[i].alive){
						
						if(pieces[i].isPinned == 0){
							pieces[i].findMovesBeforeMyTurn();
							//console.log(pieces[i].moves);
						}
						else if(pieces[i].isPinned == 1){
							pieces[i].findMovesBeforeMyTurn();
							
							temp = pieces[i].moves;
							//console.log(temp);
							pieces[i].moves = [];

							for(let j=0 ; j<temp.length ; j++){
								for(let k=0 ; k<pieces[i].pinnedPath.length ; k++){
									if(temp[j].x == pieces[i].pinnedPath[k].x){
										if(temp[j].y == pieces[i].pinnedPath[k].y){
											pieces[i].moves.push({x:temp[j].x,y:temp[j].y});
										}
									}
								}
								//console.log(pieces[i].moves);
							}
							temp = [];
						}
						else{
							pieces[i].moves = [];
						}
					}
				}
				
				pieces[playerTurn*16].findMovesBeforeMyTurn();
				
				/*
				if(pieces[playerTurn*16].inCheck == 1){
					for(let i=playerTurn*16 + 1 ; i<playerTurn*16 + 16 ; i++){
						pieces[i].myKingInCheck();
					}
				}
				else if(pieces[playerTurn*16].inCheck == 0){
					for(let i=playerTurn*16 + 1 ; i<playerTurn*16 + 16 ; i++){
						pieces[i].beforeMyTurn();
					}
				}
				else{
				}
				*/

				//find possible move of king
				//pieces2[playerTurn*16].movesBoardIsLimit();
				//pieces2[playerTurn*16].movesFriendIsLimit();
				//pieces2[playerTurn*16].movesEnemyIsLimit();



				/*
				//final possible moves of the pieces
				//after board limit, same piece in way, opposite in way, pinned by enemy piece
				for(let i=(!playerTurn)*16 ; i<(16 + (!playerTurn)*16); i++){
					pieces2[i].isprotected = 0;
					for(let j=(!playerTurn)*16 ; j<(16 + (!playerTurn)*16) ; j++){
						if(j != i){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(pieces2[i].x == pieces2[j].moves[k].x){
									if(pieces2[i].y == pieces2[j].moves[k].y){
										pieces2[i].isprotected = 1;
									}
								}
							}
						}
					}
				}

				pieces2[playerTurn*16].movesBoardIsLimit();
				pieces2[playerTurn*16].movesFriendIsLimit();
				pieces2[playerTurn*16].movesEnemyIsLimit();
//                pieces2[playerTurn*16].analyze();

//                pieces2[playerTurn*16]

				for(let i=playerTurn*16 ; i<(16 + playerTurn*16) ; i++){
					pieces2[i].movesEnemyKingIsLimit();
				}

				/*
				for(let i=(!playerTurn)*16 ; i<(16 + (!playerTurn)*16) ; i++){
					for(let j=0 ; j<pieces2[i].moves.length ; j++){
						if(pieces2[playerTurn*16].x == pieces2[j].moves[j].x){
							if(pieces2[playerTurn*16].y == pieces2[j].moves[j].y){
								pieces2[playerTurn*16].isInCheckByHowMany++;
							}
						}
					}
				}
				*/
				
				//if king in check, draw red color
				if(pieces[playerTurn*16].inCheck >= 1){
					redSquare = {
						x:pieces[playerTurn*16].x,
						y:pieces[playerTurn*16].y,
					};
					fillColor(pieces[playerTurn*16].x,pieces[playerTurn*16].y,redColor);
					pieces[playerTurn*16].draw();
					
					/*
					there is no need for this. any move near king in checkpath is in onFire moves
					//eliminating check path moves from king possible moves
					for(let j=0 ; j<pieces[playerTurn*16].moves.length ; j++){
						temp.push({x:pieces[playerTurn*16].moves[j].x,y:pieces[playerTurn*16].moves[j].y});
					}
					pieces[playerTurn*16].moves = [];

					for(let j=0 ; j<temp.length ; j++){
						for(let k=0 ; k<pieces[playerTurn*16].checkPath.length ; k++){
							if(temp[j].x == pieces[playerTurn*16].checkPath[k].x){
								if(temp[j].y == pieces[playerTurn*16].checkPath[k].y){
									pieces[i].moves.push({x:temp[j].x,y:temp[j].y});
								}
							}
							temp = [];
						}
					}
					*/
				}

				console.log(22222);
				

				//finding total possible moves by comparing pieces move with chech path of king
				//let temp = []; already declared up
				let totalPossibleMoves = 0;

				if(pieces[playerTurn*16].inCheck == 1){
					//console.log(pieces[playerTurn*16].inCheck);
					totalPossibleMoves = 0;

					for(let i = playerTurn*16 + 1; i<playerTurn*16 + 16 ; i++){
						if(pieces[i].alive){
							
							temp = pieces[i].moves;
							pieces[i].moves = [];

							for(let j=0 ; j<temp.length ; j++){
								for(let k=0 ; k<pieces[playerTurn*16].checkPath.length ; k++){
									
									if(temp[j].x == pieces[playerTurn*16].checkPath[k].x){
										if(temp[j].y == pieces[playerTurn*16].checkPath[k].y){
											pieces[i].moves.push({x:temp[j].x,y:temp[j].y});
											totalPossibleMoves++;
										}
									}
								}
							}
							temp = [];
						}
						//console.log(pieces[i].moves);
					}
					if(totalPossibleMoves + pieces[playerTurn*16].moves.length == 0){
						weHaveAWinner(!playerTurn);
						return;
					}
				}
				else if(pieces[playerTurn*16].inCheck > 1){
					for(let i = playerTurn*16 + 1; i<playerTurn*16 + 16 ; i++){
						pieces[i].moves = [];
					}
					if(pieces[playerTurn*16].moves.length == 0){
						weHaveAWinner(!playerTurn);
						return;
					}
				}

				/*
				bk.immediateNeighboursAre = [];

				//check every enemy piece if its pinned
				if(playerTurn == 0){
					if(wr1.alive == 1){
						if(bk.x == wr1.x){
							if(bk.y > wr1.y){
								if(wr1.y == bk.y-unit){
									bk.isInCheck = 1;
									bk.isInCheckByHowMany = 1;
									bk.immediateNeighboursAre.push(wr1);
								}
								else{
									
								}
							}
						}

					}
				}
				*/

				//is king in check
				//can it get out of check?
				//capture attacking piece
				//king to move to safe square
				//block the line of fire
				//analyze possible moves of other pieces
				//if no moves then game over
				//results here will determine the possible moves of pieces

				/*
				//checking enemy king is in check or not
				pieces[playerTurn].checkPath = [];
				if(playerTurn == 0){
					wr1.isEnemyKingInPath();
					wr2.isEnemyKingInPath();
				}
				else{
					br1.isEnemyKingInPath();
					br2.isEnemyKingInPath();
				}
				*/
			}
		}
		else{
			ctx2.clearRect(0,0,canvas.width,canvas.height);
			selectedPiece.selected = 0;
			selectOrMove = 1;
		}
	}
}

function whichSquare(x,y){
	let fx,fy;
	for(let j = 0 ; j <= 8 ; j++) {
		if(unit * j - x <= unit) {
			fx = unit * (j-1);
		}
		if(unit*j - y <= unit) {
			fy = unit * (j-1);
		}
	}
//	console.log(fx,fy);
	return [fx, fy];
}

function whichColorSquare(x,y) {
	let thei,thej;

	for(i=0;i<8;i++) {
		if(x == unit*i) {
			thei = i%2;
		}
		if(y == unit*i) {
			thej = i%2;
		}
	}
	if(thei == 0) {
		if(thej == 0) {
			return lightColor;
		} else {
			return darkColor;
		}
	} else {
		if(thej == 0) {
			return darkColor;
		} else {
			return lightColor;
		}
	}
}

function whichPieceAt(x,y) {
	for(let i=0 ; i<pieces.length ; i++){
		if(pieces[i].alive){
			if(pieces[i].x == x && pieces[i].y == y){
				return pieces[i];
			}
		}
	}
	/*
	pieces[pieces.length-2].forEach(p => {
		//
	});

	pieces[pieces.length-1].forEach(p => {
		//
	});
	*/
	/*
	piece.forEach(p => {
		p.forEach(e => {
			if(e.alive && e.x == x && e.y == y) {
				return e;
			}
		});
	});
	*/
	return 0;
}

function checkBorderReached(x,y){
	if(x < 0 || x > unit*7 || y < 0 || y > unit*7){
		return 1;
	}
	return 0;
}

function fillColor(x,y,color){
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.moveTo(x,y + unit/2);
	ctx.lineTo(x+unit,y + unit/2);
	ctx.lineWidth=unit;
	ctx.stroke();
}

function weHaveAWinner(player){
	let color = player ? "White" : "Black";
	ctx2.textAlign = "center";
	ctx2.font = unit*1.3 + "px georgia";
	ctx2.fillStyle = "grey";
	ctx2.fillText(color + " Wins!",unit*4,unit*4);

}

/*
function selectAPiece(x,y){
	square1 = whichSquare(x,y);
	selectedPiece = whichPieceAt(square1[0],square1[1]);
	
	if(selectedPiece != 0){
		if(selectedPiece.color == playerTurn){
			if(selectedPiece.moves.length != 0){
				selectedPiece.drawPossibleMoves();
				selectOrMove = 2;
			}
		}
	}
}
*/



	/*
	if(wk.alive && wk.x == x && wk.y == y){
		wk.alive = 0;
		return 1;
	}
	else if(bk.alive && bk.x == x && bk.y == y){
		bk.alive = 0;
		return 1;
	}
	//queens
	else if(wq.alive && wq.x == x && wq.y == y){
		wq.alive = 0;
		return 1;
	}
	else if(bq.alive && bq.x == x && bq.y == y){
		bq.alive = 0;
		return 1;
	}
	//rooks
	else if(wr1.alive && wr1.x == x && wr1.y == y){
		wr1.alive=0;
		return 1;
	}
	else if(wr2.alive && wr2.x == x && wr2.y == y){
		wr2.alive = 0;
		return 1;
	}
	else if(br1.alive && br1.x == x && br1.y == y){
		br1.alive = 0;
		return 1;
	}
	else if(br2.alive && br2.x == x && br2.y == y){
		br2.alive = 0;
		return 1;
	}
	//bishops
	else if(wb1.alive && wb1.x == x && wb1.y == y){
		wb1.alive = 0;
		return 1;
	}
	else if(wb2.alive && wb2.x == x && wb2.y == y){
		wb2.alive = 0;
		return 1;
	}
	else if(bb1.alive && bb1.x == x && bb1.y == y){
		bb1.alive = 0;
		return 1;
	}
	else if(bb2.alive && bb2.x == x && bb2.y == y){
		bb2.alive = 0;
		return 1;
	}
	//knights
	else if(wn1.alive && wn1.x == x && wn1.y == y){
		wn1.alive = 0;
		return 1;
	}
	else if(wn2.alive && wn2.x == x && wn2.y == y){
		wn2.alive = 0;
		return 1;
	}
	else if(bn1.alive && bn1.x == x && bn1.y == y){
		bn1.alive = 0;
		return 1;
	}
	else if(bn2.alive && bn2.x == x && bn2.y == y){
		bn2.alive = 0;
		return 1;
	}
	//pawns
//you can use while loop here, saves time. no you can't actually. what in the blue heck are you going to put the condition in the while loop
	wp.forEach(pawny => {
		if(pawny.alive && pawny.x == x && pawny.y == y){
			pawny.alive = 0;
			return 1;
		}
	});
	
	bp.forEach(pawny => {
		if(pawny.alive && pawny.x == x && pawny.y == y){
			pawny.alive = 0;
			return 1;
		}
	});


	for(i=0;i<8;i++){
		if(wp[i].alive && wp[i].x == x && wp[i].y == y){
			wp[i].alive = 0;
			return 1;
		}
	}
	for(i=0;i<8;i++){
		if(bp[i].alive && bp[i].x == x && bp[i].y == y){
			bp[i].alive = 0;
			return 1;
		}
	}

	return 0;
*/

/*
//kings
	if(wk.alive && wk.x == x && wk.y == y){
		wk.selected = 1;
		selected=wk;
	}
	else if(bk.alive && bk.x == x && bk.y == y){
		bk.selected = 1;
		selected=bk;
	}
	//queens
	else if(wq.alive && wq.x == x && wq.y == y){
		wq.selected = 1;
		selected=wq;
	}
	else if(bq.alive && bq.x == x && bq.y == y){
		bq.selected = 1;
		selected=bq;
	}
	//rooks
	else if(wr1.alive && wr1.x == x && wr1.y == y){
		wr1.selected = 1;
		selected=wr1;
	}
	else if(wr2.alive && wr2.x == x && wr2.y == y){
		wr2.selected = 1;
		selected=wr2;
	}
	else if(br1.alive && br1.x == x && br1.y == y){
		br1.selected = 1;
		selected=br1;
	}
	else if(br2.alive && br2.x == x && br2.y == y){
		br2.selected = 1;
		selected=br2;
	}
	//bishops
	else if(wb1.alive && wb1.x == x && wb1.y == y){
		wb1.selected = 1;
		selected=wb1;
	}
	else if(wb2.alive && wb2.x == x && wb2.y == y){
		wb2.selected = 1;
		selected=wb2;
	}
	else if(bb1.alive && bb1.x == x && bb1.y == y){
		bb1.selected = 1;
		selected=bb1;
	}
	else if(bb2.alive && bb2.x == x && bb2.y == y){
		bb2.selected = 1;
		selected=bb2;
	}
	//knights
	else if(wn1.alive && wn1.x == x && wn1.y == y){
		wn1.selected = 1;
		selected=wn1;
	}
	else if(wn2.alive && wn2.x == x && wn2.y == y){
		wn2.selected = 1;
		selected=wn2;
	}
	else if(bn1.alive && bn1.x == x && bn1.y == y){
		bn1.selected = 1;
		selected=bn1;
	}
	else if(bn2.alive && bn2.x == x && bn2.y == y){
		bn2.selected = 1;
		selected=bn2;
	}
	//pawns
	wp.forEach(pawny => {
		if(pawny.alive && pawny.x == x && pawny.y == y){
			pawny.selected = 1;
			selected = pawny;
		}
	});
	
	bp.forEach(pawny => {
		if(pawny.alive && pawny.x == x && pawny.y == y){
			pawny.selected = 1;
			selected = pawny;
		}
	});

	//second way of checking pawns. it returns as soon as a match is there
	for(i=0;i<8;i++){
		if(wp[i].alive && wp[i].x == x && wp[i].y == y){
			wp[i].selected = 1;
			selected = wp[i];
			return;
		}
	}
	for(i=0;i<8;i++){
		if(bp[i].alive && bp[i].x == x && bp[i].y == y){
			bp[i].alive = 0;
			selected = bp[i];
			return;
		}
	}
*/