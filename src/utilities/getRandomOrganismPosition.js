import { getRandomFromRange } from './getRandomFromRange';

export function getRandomOrganismPosition(board) {
  let organismPositionX = getRandomFromRange(board.width);
  let organismPositionY = getRandomFromRange(board.height);
  let isSpaceOccupied = board.getOrganism(organismPositionY, organismPositionX);

  while (isSpaceOccupied) {
    organismPositionX = getRandomFromRange(board.width);
    organismPositionY = getRandomFromRange(board.height);
    isSpaceOccupied = board.getOrganism(organismPositionY, organismPositionX);
  }

  return { x: organismPositionX, y: organismPositionY };
}