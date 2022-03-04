/*
 * Functions for handling game logic
 */

import {
  CANVAS_W,
  GRAVITY,
  OBJECT_ACCEL,
  OBSTACLE_H,
  OBSTACLE_SPAWN_CHANCE,
  OBSTACLE_W,
  PARTICLE_SPAWN_CHANCE,
  PARTICLE_SPREAD,
  PLAYER_BASE_X,
  PLAYER_BASE_Y,
  PLAYER_W,
  SCORE_PER_COLLISION,
  SCORE_PER_W,
} from './main'

export function recalculateState(state: any) {
  state.objectSpeed += OBJECT_ACCEL
  state.score += state.objectSpeed * SCORE_PER_W
  state.highScore = Math.max(state.score, state.highScore)
  recalculatePlayerPosition(state)
  removePassedObstacles(state)
  trySpawnObstacle(state)
  recalculateObstaclePositions(state)
  checkCollisions(state)
  removePassedParticles(state)
  trySpawnParticles(state)
  recalculateParticlePositions(state)
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
      isColliding: false,
    })
  }
}

function recalculateObstaclePositions(state: any) {
  for (const obstacle of state.obstacles) {
    obstacle.x -= state.objectSpeed
  }
}

function checkCollisions(state: any) {
  for (const obstacle of state.obstacles) {
    let isCollisionDetected = false

    if (
      ((obstacle.x > PLAYER_BASE_X && obstacle.x < PLAYER_BASE_X + PLAYER_W) ||
        (obstacle.x + obstacle.width > PLAYER_BASE_X &&
          obstacle.x + obstacle.width < PLAYER_BASE_X + PLAYER_W)) &&
      obstacle.y - obstacle.height < state.player.y
    ) {
      isCollisionDetected = true
    }

    if (isCollisionDetected && !obstacle.isColliding) {
      state.score -= SCORE_PER_COLLISION
    }

    obstacle.isColliding = isCollisionDetected
  }
}

function removePassedParticles(state: any) {
  state.particles = state.particles.filter(
    (particle: any) => particle.x + particle.size > 0,
  )
}

function trySpawnParticles(state: any) {
  if (Math.random() < PARTICLE_SPAWN_CHANCE) {
    const particleOffsetY = Math.ceil(Math.random() * PARTICLE_SPREAD + 10)
    state.particles.push({
      x: CANVAS_W,
      y: PLAYER_BASE_Y + particleOffsetY,
      size: Math.ceil(Math.random() * 3 + 1),
    })
  }
}

function recalculateParticlePositions(state: any) {
  for (const particle of state.particles) {
    particle.x -= state.objectSpeed
  }
}
