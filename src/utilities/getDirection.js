export const getDirection = (key) => {
  const directions = {
    'w': { directionX: 0, directionY: -1 },
    'x': { directionX: 0, directionY: 1 },
    'a': { directionX: -1, directionY: 0 },
    'd': { directionX: 1, directionY: 0 },
    'q': { directionX: -1, directionY: -1 },
    'e': { directionX: 1, directionY: -1 },
    'z': { directionX: -1, directionY: 1 },
    'c': { directionX: 1, directionY: 1 },
    's': null, // Stay in place
  };

  return directions[key] || null;
};