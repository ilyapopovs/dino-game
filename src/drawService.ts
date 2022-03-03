import { Dot, ObjectSizes, PlayerSize } from './types'

/**
 * Logic for drawing in-game objects
 *
 */
export class DrawService {
  private context: CanvasRenderingContext2D
  private playerSize: PlayerSize

  constructor(context: CanvasRenderingContext2D, { playerSize }: ObjectSizes) {
    this.context = context
    this.playerSize = playerSize
  }

  drawMesh(width: number, height: number, interval: number) {
    const c = this.context
    for (let x = interval; x < width; x += interval) {
      for (let y = interval; y < height; y += interval) {
        c.beginPath()
        c.moveTo(x, 0)
        c.lineTo(x, height)
        c.moveTo(0, y)
        c.lineTo(width, y)
        c.closePath()
        c.lineWidth = 0.1
        c.strokeStyle = 'white'
        c.stroke()
      }
    }
  }

  drawPlayer({ x, y }: Dot) {
    this.context.fillRect(x, y, this.playerSize.width, -this.playerSize.height)
  }
}
