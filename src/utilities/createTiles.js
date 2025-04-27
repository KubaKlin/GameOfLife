import { Tile } from '../Tile';

export function createTiles(width, height, board) {
  const tiles = [];
  for (let directionY = 0; directionY < height; directionY++) {
    const row = [];
    for (let directionX = 0; directionX < width; directionX++) {
      row.push(new Tile(directionY, directionX, board));
    }
    tiles.push(row);
  }
  return tiles;
}
