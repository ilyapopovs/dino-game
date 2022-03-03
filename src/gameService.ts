/*
 * Functions for handling game logic
 */

import {
  canvasSize,
  GRAVITY,
  OBSTACLE_ACCEL,
  OBSTACLE_HEIGHT,
  OBSTACLE_SPAWN_CHANCE,
  OBSTACLE_WIDTH,
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
      x: canvasSize.width,
      y: PLAYER_BASE_Y,
      width: OBSTACLE_WIDTH,
      height: OBSTACLE_HEIGHT,
    })
  }
}

function recalculateObstaclePositions(state: any) {
  for (const obstacle of state.obstacles) {
    obstacle.x -= state.obstacleSpeed
  }
  state.obstacleSpeed += OBSTACLE_ACCEL
}
