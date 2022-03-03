import { PLAYER_BASE_X } from './main'
import { CanvasSize, PlayerSize } from './types'

/**
 * Logic for drawing in-game objects
 *
 */
export class DrawService {
  private context: CanvasRenderingContext2D
  private canvasSize: CanvasSize
  private playerSize: PlayerSize

  constructor(
    context: CanvasRenderingContext2D,
    canvasSize: CanvasSize,
    playerSize: PlayerSize,
  ) {
    this.context = context
    this.canvasSize = canvasSize
    this.playerSize = playerSize
  }

  clear() {
    this.context.fillStyle = 'white'
    this.context.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)
  }

  drawMesh(interval: number = 50) {
    const c = this.context
    c.lineWidth = 0.1
    c.strokeStyle = 'gray'

    for (let x = interval; x < this.canvasSize.width; x += interval) {
      for (let y = interval; y < this.canvasSize.height; y += interval) {
        c.beginPath()
        c.moveTo(x, 0)
        c.lineTo(x, this.canvasSize.height)
        c.moveTo(0, y)
        c.lineTo(this.canvasSize.width, y)
        c.closePath()
        c.stroke()
      }
    }
  }

  drawGround(y: number) {
    const c = this.context
    c.lineWidth = 1
    c.strokeStyle = 'black'

    c.beginPath()
    c.moveTo(0, y)
    c.lineTo(this.canvasSize.width, y)
    c.closePath()
    c.stroke()
  }

  drawPlayer(y: number) {
    this.context.fillStyle = 'black'
    this.context.fillRect(
      PLAYER_BASE_X,
      y,
      this.playerSize.width,
      -this.playerSize.height,
    )
  }

  drawObstacles(obstacles: any[]) {
    const c = this.context
    c.fillStyle = 'black'

    obstacles.forEach((obstacle) =>
      c.fillRect(obstacle.x, obstacle.y, obstacle.width, -obstacle.height),
    )
  }
}
