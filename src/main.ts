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
const startButton = document.getElementById('start-btn')!
const highScoreSpan = document.getElementById('high-score')!
const scoreSpan = document.getElementById('score')!
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
export const SCORE_PER_W = 10 / 700
export const SCORE_PER_COLLISION = 25 // allows infinite score at a certain speed - good enough for MVP, but better to make dynamic
export const OBJECT_ACCEL = 0.002
export const OBJECT_BASE_SPEED = 5
export const OBSTACLE_W = 50
export const OBSTACLE_H = 50
export const OBSTACLE_SPAWN_CHANCE = 0.01
export const PARTICLE_SPAWN_CHANCE = 0.05
export const PARTICLE_SPREAD = 50
const TICKS_PER_SEC = 60

const INITIAL_STATE = {
  player: {
    y: PLAYER_BASE_Y,
    speed: 0,
  },
  isGameOver: false,
  score: 0,
  highScore: 0,
  objectSpeed: OBJECT_BASE_SPEED,
  obstacles: [],
  particles: [],
}

let interval: number = 0
let state: any = null

startButton.onclick = () => {
  restartGame()
  startButton.blur()
}

function restartGame() {
  clearInterval(interval)
  startButton.innerText = 'RESTART'
  state = { ...INITIAL_STATE }
  interval = setInterval(tick, (1 / TICKS_PER_SEC) * 1000)
}

function redraw() {
  clear()
  // drawMesh()
  drawGround(PLAYER_BASE_Y)
  drawParticles(state.particles)
  drawObstacles(state.obstacles)
  drawPlayer(state.player.y)
}

function tick() {
  recalculateState(state)
  redraw()
  highScoreSpan.innerText = Math.floor(state.highScore).toString()
  scoreSpan.innerText = Math.floor(state.score).toString()
}

function jump() {
  if (state.player.y === PLAYER_BASE_Y) {
    state.player.speed = JUMP_SPEED
  }
}

// Key bindings
let spacebarCallback = () => {
  interval ? jump() : restartGame()
  spacebarCallback = jump
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    return spacebarCallback()
  }

  if (e.code === 'KeyR') {
    return restartGame()
  }

  if (['ShiftLeft', 'ShiftRight', 'ArrowUp', 'KeyJ'].includes(e.code)) {
    return jump()
  }
})

canvas.addEventListener('touchstart', () => spacebarCallback())
canvas.addEventListener('mousedown', () => spacebarCallback())
