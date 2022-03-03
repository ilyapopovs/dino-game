import './style.css'
import { DrawService } from './drawService'
import { recalculateState } from './gameService'
import type { CanvasSize, PlayerSize } from './types'

// DOM bindings
const canvas = document.getElementById('board') as HTMLCanvasElement
const context = canvas.getContext('2d')!
const jumpButton = document.getElementById('jump-btn')!

// Settings
export const canvasSize: CanvasSize = { width: 700, height: 500 }
export const playerSize: PlayerSize = { width: 50, height: 100 }
export const PLAYER_BASE_X = 100
export const PLAYER_BASE_Y = canvasSize.height - 150
export const JUMP_SPEED = 20
export const GRAVITY = 1
export const OBSTACLE_WIDTH = 50
export const OBSTACLE_HEIGHT = 50
export const OBSTACLE_SPEED = 5
export const OBSTACLE_ACCEL = 0.001
export const OBSTACLE_SPAWN_CHANCE = 0.01
const TICKS_PER_SEC = 60

const state = {
  player: {
    y: PLAYER_BASE_Y,
    speed: 0,
  },
  isGameOver: false,
  obstacleSpeed: OBSTACLE_SPEED,
  obstacles: [],
}

const drawService = new DrawService(context, canvasSize, playerSize)

const redraw = () => {
  drawService.clear()
  // drawService.drawMesh()
  drawService.drawGround(PLAYER_BASE_Y)
  drawService.drawPlayer(state.player.y)
  drawService.drawObstacles(state.obstacles)
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
