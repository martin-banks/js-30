"use strict"

const canvasTemplate = () => `<canvas 
	id="draw"
	width="${window.innerWidth}"
	height="${window.innerHeight}"
></canvas>`
document.querySelector('#app').innerHTML = canvasTemplate()

const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 1
let color = 0
let opacity = 1
ctx.strokeStyle = `hsla(${color}, 50%, 50%, ${opacity})`

let isDrawing = false
let lastX = 0
let lastY = 0

function draw(e) {
	if (!isDrawing) return
	//console.log(e)
	ctx.beginPath()
	ctx.moveTo(lastX, lastY)
	ctx.lineTo(e.offsetX, e.offsetY)
	ctx.stroke()

	console.log(e.offsetX - lastX, e.offsetY - lastY)
	let diffX = e.offsetX - lastX
	let diffY = e.offsetY - lastY

	let updateSize = ((Math.sqrt(Math.pow(diffX, 2))) + (Math.sqrt(Math.pow(diffY, 2))))
	ctx.lineWidth = updateSize
	// [lastX, lastY] = [e.offsetX, e.offsetY]
	lastX = e.offsetX
	lastY = e.offsetY
	color++
	ctx.strokeStyle = `hsla(${color}, 50%, 50%, ${opacity})`
}

function stopDraw() {
	ctx.lineWidth = 1
	isDrawing = false
}
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mousedown', e => {
	isDrawing = true
	// [lastX, lastY] = [e.offsetX, e.offsetY]
	lastX = e.offsetX
	lastY = e.offsetY
	//[lastX, lastY] = [e.offsetX, e.offsetY]
})
canvas.addEventListener('mouseup', stopDraw)
canvas.addEventListener('mouseout', stopDraw)
