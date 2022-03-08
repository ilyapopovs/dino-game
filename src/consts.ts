export const CANVAS_W = 700
export const CANVAS_H = 500
export const PLAYER_W = 50
export const PLAYER_H = 100
export const PLAYER_BASE_X = 100
export const PLAYER_BASE_Y = CANVAS_H - 150
export const GROUND_OFFSET = 15
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
export const PARTICLE_SPREAD = 20
export const TICKS_PER_SEC = 60
export const ACTION_JUMP = 'jump'
export const ACTION_RESTART = 'restart'

export type State = {
  player: {
    y: number
    speed: number
  }
  isGameOver: boolean
  score: number
  highScore: number
  objectSpeed: number
  obstacles: never[]
  particles: never[]
}
