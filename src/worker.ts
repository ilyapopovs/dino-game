import {
  ACTION_JUMP,
  ACTION_RESTART,
  JUMP_SPEED,
  OBJECT_BASE_SPEED,
  PLAYER_BASE_Y,
  TICKS_PER_SEC,
} from './consts'
import type { State } from './consts'
import { recalculateState } from './gameService'

const INITIAL_STATE: State = {
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

let interval: number
let state: State

function onRestart() {
  if (interval) {
    clearInterval(interval)
  }

  state = { ...INITIAL_STATE } // note: nested values don't get reset
  interval = setInterval(tick, (1 / TICKS_PER_SEC) * 1000)
}

function tick() {
  recalculateState(state)
  postMessage(state)
}

function onJump() {
  if (state.player.y === PLAYER_BASE_Y) {
    state.player.speed = JUMP_SPEED
  }
}

onmessage = (e: MessageEvent<String>) => {
  const actionName = e.data

  if (actionName === ACTION_JUMP) {
    return onJump()
  }

  if (actionName === ACTION_RESTART) {
    return onRestart()
  }

  console.log('Worker received unexpected payload', { payload: e.data })
}
