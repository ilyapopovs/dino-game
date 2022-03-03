import './style.css'
import { DrawService } from './drawService'
import { recalculatePlayerState } from './gameService'
import type { CanvasSize, PlayerSize } from './types'

// DOM bindings
const canvas = document.getElementById('board') as HTMLCanvasElement
const context = canvas.getContext('2d')!
const jumpButton = document.getElementById('jump-btn')!

// Settings
const canvasSize: CanvasSize = { width: 500, height: 500 }
const playerSize: PlayerSize = { width: 50, height: 100 }
export const PLAYER_BASE_X = 100
export const PLAYER_BASE_Y = canvasSize.height - 150
export const JUMP_SPEED = 20
export const GRAVITY = 1
const TICKS_PER_SEC = 60

const playerState = {
  y: PLAYER_BASE_Y,
  speed: 0,
}

const drawService = new DrawService(context, canvasSize, playerSize)

const redraw = () => {
  drawService.clear()
  drawService.drawMesh()
  drawService.drawGround(PLAYER_BASE_Y)
  drawService.drawPlayer(playerState.y)
}

const tick = () => {
  recalculatePlayerState(playerState)
  redraw()
}

setInterval(tick, (1 / TICKS_PER_SEC) * 1000)

jumpButton.onclick = () => {
  if (playerState.y === PLAYER_BASE_Y) {
    playerState.speed = JUMP_SPEED
  }
}
