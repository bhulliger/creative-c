import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

@Component({
	templateUrl: "build/pages/preview/preview.html"
})

export class PreviewPage {

	ringSize: number;
	ringWidth: number;

	words: string[];
	unrenderedWords: string[];
	fonts: string[] = ['10pt Helvetica', '11pt Helvetica', '12pt Helvetica', '14pt Helvetica'];
	styles: string[] = ['', 'bold'];
	canvasHeight: number;
	canvasWidth: number;
	lineHeight: number = 18;
	minSpace: number = 1;
	pxPerMm: number = 12; //assumed number of px per mm

	constructor(private nav: NavController, navParams: NavParams) {
		this.ringSize = navParams.get('ringSize');
		this.ringWidth = navParams.get('ringWidth');
		this.words = navParams.get('words');
		this.unrenderedWords = [];

		this.canvasWidth = this.ringSize * this.pxPerMm;
		this.canvasHeight = this.ringWidth * this.pxPerMm;
	}

	onOrder() {

	}

	render() {
		console.log('rendering new');

		// calculate size of canvas, rows and columns ***********************
		// number of rows. divide rest to inbetweens
		var tmpRows = (this.canvasHeight - this.minSpace) / (this.lineHeight + this.minSpace);
		// calculate real number of rows
		var rows = Math.floor(tmpRows);
		// caluclate real space between lines
		var spaceY = this.minSpace + (tmpRows - rows) / (rows + 1);

		// calculate number of rows. divide rest to spaces inbetween
		var tmpColumns = (this.canvasWidth - this.minSpace) / (this.lineHeight + this.minSpace);
		var columns = Math.floor(tmpColumns);
		// calculate real space between columns
		var spaceX = this.minSpace + (tmpColumns - columns) / (columns + 1);

		// rasterize canvas *************************************************
		var raster = [];
		for (var column = 0; column < columns; column++) {
			var array = [];
			for (var row = 0; row < rows; row++) {
				var obj = { 'W': columns - column, 'S': rows - row};
				array.push(obj);
			}
			raster.push(array);
		}

		// draw on canvas ***************************************************
		var canvas: any = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		canvas.setAttribute('width', this.canvasWidth);
		canvas.setAttribute('height', this.canvasHeight);

		var tmp: any = document.getElementById('tmp');
		var tmpCtx = tmp.getContext('2d');

		for (var i = 0; i < this.words.length; i++) {
			var word = this.words[i];

			tmpCtx.font = this.styles[Math.floor(Math.random() * this.styles.length)] + ' ' + this.fonts[Math.floor(Math.random() * this.fonts.length)];
			var width = tmpCtx.measureText(word).width;

			// search for next free position **************
			// calculate the number of required tiles for printing
			var numberOfTiles = Math.round(width / (this.lineHeight + spaceX));

			// search for first tile that has at least <numberOfTiles> free neighbors
			var tile;
			var tileX = 0;
			var tileY = 0;

			tile: for(var x = 0; x < columns; x++) {
				for (var y = 0; y < rows; y++) {
					var currentTile = raster[x][y];
					if (currentTile === undefined) continue; // current tile is already occupied
					if (currentTile['S'] >= numberOfTiles || currentTile['W'] >= numberOfTiles) {
						tile = currentTile;
						tileX = x;
						tileY = y;
						break tile;
					}
				}
			}

			// check rotation *****************************
			var degrees = 0;
			if (tile['S'] >= numberOfTiles && tile['W'] >= numberOfTiles) {
				// rotate any direction
				degrees = Math.floor(Math.random() * 4) * 90;
			} else if (tile['S'] >= numberOfTiles) {
				// rotate word to be vertical
				degrees = Math.floor(Math.random() * 2) * 180 + 90;
			} else if (tile['W'] >= numberOfTiles) {
				// rotate word to be horizontal
				degrees = Math.floor(Math.random() * 2) * 180;
			} else {
				console.log('not enough free space to render word: ' + word);
				this.unrenderedWords.push(word);
				continue;
			}

			// print word **********************************
			tmpCtx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
			if (degrees === 0 || degrees === 180) {
				var maxWidth = numberOfTiles * this.lineHeight + (numberOfTiles - 1) * spaceX;
			} else if (degrees === 90 || degrees === 270) {
				var maxWidth = numberOfTiles * this.lineHeight + (numberOfTiles - 1) * spaceY;
			}

			tmpCtx.save();

			switch(degrees) {
				case 0:
					tmpCtx.translate(0,0);
					break;
				case 90:
					tmpCtx.translate(this.lineHeight, 0);
					break;
				case 180:
					tmpCtx.translate(maxWidth, this.lineHeight);
					break;
				case 270:
					tmpCtx.translate(0, maxWidth);
					break;
				default:
					break;
			}

			tmpCtx.rotate(degrees * Math.PI / 180);
			tmpCtx.textBaseline = 'middle';
			tmpCtx.fillStyle = 'black';

			if (width < maxWidth) {
				tmpCtx.scale(maxWidth / width, 1);
			}

			tmpCtx.fillText(word, 0, this.lineHeight / 2, maxWidth);
			tmpCtx.restore();

			ctx.globalCompositeOperation = 'source-over';
			ctx.drawImage(tmp, tileX * this.lineHeight + tileX * spaceX + spaceX, tileY * this.lineHeight * spaceY + spaceY);

			tmpCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

			// update raster *******************************
			// horizontal orientation
			
			if (degrees === 0 || degrees === 180) {
				// 1. update the 'W'-value of all tiles east of tileX
				for (var x = 0; x < tileX; x++) {
					if (raster[x][tileY] !== undefined) {
						raster[x][tileY]['W'] = raster[x][tileY]['W'] = Math.min(raster[x][y]['W'], tileX - x);
					}
				}
				// 2. set all occupied tiles to undefined
				for (var x = tileX; x < tileX + numberOfTiles; x++) {
					raster[x][tileY] = undefined;
					
					// 3. update the 'S'-value of all tiles north of the tile
					for (var y = 0; y < tileY; y++) {
						if (raster[x][y] !== undefined) {
							raster[x][y]['S'] = Math.min(raster[x][y]['S'], tileY - y);
						}
					}
				}
			} else if (degrees === 90 || degrees === 270) {
				// 1. update the 'S'-value of all tiles north of tileY
				for (var y = 0; y < tileY; y++) {
					if (raster[tileX][y] !== undefined) {
						raster[tileX][y]['S'] = Math.min(raster[tileX][y]['S'], tileY - y);
						
					}
				}
				// 2. set all occupied tiles to undefined
				for (var y = tileY; y < tileY + numberOfTiles; y++) {
					raster[tileX][y] = undefined;
					
					// 3. update the 'W'-value of all tiles east of the tile
					for (var x = 0; x < tileX; x++) {
						if (raster[x][y] !== undefined) {
							raster[x][y]['W'] = Math.min(raster[x][y]['W'], tileX - x);
						}
					}
				}
			}
		}

		// fill empty tiles with black lines **********************************************
		for (var x = 0; x < raster.length; x++) {
			for (var y = 0; y < raster[x].length; y++) {
				if (raster[x][y] !== undefined && raster[x][y]['W'] > 0) {
					// draw horizontal line
					var freeTiles = raster[x][y]['W'];
					var length = freeTiles * this.lineHeight + (freeTiles - 1) * spaceX;
					ctx.fillRect(x * this.lineHeight + x * spaceX + this.lineHeight / 2, y * this.lineHeight + y * spaceY + this.lineHeight / 2, length, this.lineHeight / 4);
				} else if (raster[x][y] !== undefined && raster[x][y]['S'] > 0) {
					// draw vertical line
					var freeTiles = raster[x][y]['S'];
					var length = freeTiles * this.lineHeight + (freeTiles - 1) * spaceY;
					ctx.fillRect(x * this.lineHeight + x * spaceX + this.lineHeight / 2, y * this.lineHeight + y * spaceY + this.lineHeight / 2, this.lineHeight / 4, length);
				}
			}
		}

		

		console.log('done rendering');
}


}