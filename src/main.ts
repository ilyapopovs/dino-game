import './style.css'
import { DrawService } from './drawService'

const canvas = document.getElementById('board') as HTMLCanvasElement
const context = canvas.getContext('2d')!
const startButton = document.getElementById('start-btn')!

const canvasSize = { width: 500, height: 500 }
const playerSize = { width: 50, height: 100, jump: 150 }
const playerBasePosition = { x: 100, y: canvasSize.height - 150 }

const drawService = new DrawService(context, { playerSize })
drawService.drawMesh(500, 500, 50)

startButton.onclick = () => {
  drawService.drawPlayer(playerBasePosition)
}
