export const CONFIG = {
  PIXEL: 30,
  WIDTH: 900,
  HEIGHT: 900,
};

export const MOVE_TO = {
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  UP: [0, -1],
};

export const TO_RIGHT = {
  RIGHT: "DOWN",
  DOWN: "LEFT",
  LEFT: "UP",
  UP: "RIGHT",
};
export const TO_LEFT = {
  RIGHT: "UP",
  DOWN: "RIGHT",
  LEFT: "DOWN",
  UP: "LEFT",
};
