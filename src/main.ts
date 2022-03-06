import MyWorker from './worker?worker'
import './style.css'
import {
  clear,
  drawGround,
  drawMesh,
  drawObstacles,
  drawParticles,
  drawPlayer,
} from './drawService'
import { ACTION_JUMP, ACTION_RESTART, PLAYER_BASE_Y } from './consts'
import type { State } from './consts'

// DOM bindings
const startButton = document.getElementById('start-btn')!
const highScoreSpan = document.getElementById('high-score')!
const scoreSpan = document.getElementById('score')!
const canvas = document.getElementById('board') as HTMLCanvasElement
export const context = canvas.getContext('2d')!

const worker = new MyWorker()
let isGameStarted = false

worker.onmessage = (e: MessageEvent<State>) => redraw(e.data)

function redraw(state: State) {
  clear()
  // drawMesh() // useful for development
  drawGround(PLAYER_BASE_Y)
  drawParticles(state.particles)
  drawObstacles(state.obstacles)
  drawPlayer(state.player.y)
  highScoreSpan.innerText = Math.floor(state.highScore).toString()
  scoreSpan.innerText = Math.floor(state.score).toString()
}

startButton.onclick = () => {
  restartGame()
  startButton.blur()
}

function restartGame() {
  isGameStarted = true
  worker.postMessage(ACTION_RESTART)
  startButton.innerText = 'RESTART'
}

function jump() {
  worker.postMessage(ACTION_JUMP)
}

// Key bindings
let spacebarCallback = () => {
  isGameStarted ? jump() : restartGame()
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
