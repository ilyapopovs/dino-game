/*
 * Logic for drawing in-game objects
 */

import {
  CANVAS_H,
  CANVAS_W,
  context as c,
  PLAYER_BASE_X,
  PLAYER_H,
  PLAYER_W,
} from './main'

export function clear() {
  c.fillStyle = 'white'
  c.fillRect(0, 0, CANVAS_W, CANVAS_H)
}

export function drawMesh(interval: number = 50) {
  c.lineWidth = 0.1
  c.strokeStyle = 'gray'

  for (let x = interval; x < CANVAS_W; x += interval) {
    for (let y = interval; y < CANVAS_H; y += interval) {
      c.beginPath()
      c.moveTo(x, 0)
      c.lineTo(x, CANVAS_H)
      c.moveTo(0, y)
      c.lineTo(CANVAS_W, y)
      c.closePath()
      c.stroke()
    }
  }
}

export function drawGround(y: number) {
  c.lineWidth = 1
  c.strokeStyle = 'black'

  c.beginPath()
  c.moveTo(0, y)
  c.lineTo(CANVAS_W, y)
  c.closePath()
  c.stroke()
}

export function drawParticles(particles: any[]) {
  c.fillStyle = 'black'

  particles.forEach((particle) => {
    c.fillRect(particle.x, particle.y, particle.size, particle.size)
  })
}

export function drawPlayer(y: number) {
  c.fillStyle = 'black'
  c.fillRect(PLAYER_BASE_X, y, PLAYER_W, -PLAYER_H)
}

export function drawObstacles(obstacles: any[]) {
  obstacles.forEach((obstacle) => {
    c.fillStyle = obstacle.isColliding ? 'red' : 'black'
    c.fillRect(obstacle.x, obstacle.y, obstacle.width, -obstacle.height)
  })
}
