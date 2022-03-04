import './style.css'
import { recalculateState } from './gameService'
import {
  clear,
  drawGround,
  drawMesh,
  drawObstacles,
  drawParticles,
  drawPlayer,
} from './drawService'

// DOM bindings
const jumpButton = document.getElementById('jump-btn')!
const canvas = document.getElementById('board') as HTMLCanvasElement
export const context = canvas.getContext('2d')!

// Settings
export const CANVAS_W = 700
export const CANVAS_H = 500
export const PLAYER_W = 50
export const PLAYER_H = 100
export const PLAYER_BASE_X = 100
export const PLAYER_BASE_Y = CANVAS_H - 150
export const JUMP_SPEED = 20
export const GRAVITY = 1
export const OBJECT_ACCEL = 0.002
export const OBSTACLE_W = 50
export const OBSTACLE_H = 50
export const OBSTACLE_SPEED = 5
export const OBSTACLE_SPAWN_CHANCE = 0.01
export const PARTICLE_SPAWN_CHANCE = 0.05
export const PARTICLE_SPREAD = 50
const TICKS_PER_SEC = 60

const state = {
  player: {
    y: PLAYER_BASE_Y,
    speed: 0,
  },
  isGameOver: false,
  obstacleSpeed: OBSTACLE_SPEED,
  obstacles: [],
  particles: [],
}

/*
 * todo:
 * add score - per X (e.g. 700 X = 10 points)
 * add hit detection - e.g. -50 points per hit
 * add start/restart buttons
 * bind jump on canvas click & spacebar
 */

const redraw = () => {
  clear()
  // drawMesh()
  drawGround(PLAYER_BASE_Y)
  drawParticles(state.particles)
  drawPlayer(state.player.y)
  drawObstacles(state.obstacles)
}

const tick = () => {
  recalculateState(state)
  redraw()
}

setInterval(tick, (1 / TICKS_PER_SEC) * 1000)

jumpButton.onclick = () => {
  if (state.player.y === PLAYER_BASE_Y) {
    state.player.speed = JUMP_SPEED
  }
}
