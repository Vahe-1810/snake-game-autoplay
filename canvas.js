import { CONFIG } from "./constants.js";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = CONFIG.WIDTH;
canvas.height = CONFIG.HEIGHT;
