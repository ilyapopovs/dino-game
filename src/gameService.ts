/*
 * Functions for handling game logic
 */

import {
  CANVAS_W,
  GRAVITY,
  OBSTACLE_ACCEL,
  OBSTACLE_H,
  OBSTACLE_SPAWN_CHANCE,
  OBSTACLE_W,
  PLAYER_BASE_Y,
} from './main'

export function recalculateState(state: any) {
  recalculatePlayerPosition(state)
  removePassedObstacles(state)
  trySpawnObstacle(state)
  recalculateObstaclePositions(state)
}

function recalculatePlayerPosition(state: any) {
  state.player.y = Math.min(state.player.y - state.player.speed, PLAYER_BASE_Y)
  state.player.speed = state.player.speed - GRAVITY
}

function removePassedObstacles(state: any) {
  state.obstacles = state.obstacles.filter(
    (obstacle: any) => obstacle.x + obstacle.width > 0,
  )
}

function trySpawnObstacle(state: any) {
  if (Math.random() < OBSTACLE_SPAWN_CHANCE) {
    state.obstacles.push({
      x: CANVAS_W,
      y: PLAYER_BASE_Y,
      width: OBSTACLE_W,
      height: OBSTACLE_H,
    })
  }
}

function recalculateObstaclePositions(state: any) {
  for (const obstacle of state.obstacles) {
    obstacle.x -= state.obstacleSpeed
  }
  state.obstacleSpeed += OBSTACLE_ACCEL
}
