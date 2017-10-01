/* eslint-disable */
"use strict"

const textTemplate = `<div class="hero">
	<h1>🔥WHOA!!</h1>
</div>`
const APP = document.querySelector('#app')
APP.innerHTML = textTemplate

const hero = document.querySelector('.hero')
const text = hero.querySelector('h1')
const walk = 100 // 100px
function shadow(e){
	// console.log(e)
	const { offsetWidth: width, offsetHeight: height } = hero
	let { offsetX: x, offsetY: y } = e

	if (this !== e.target) {
		x = x + e.target.offsetLeft
		y = y + e.target.offsetTop
	}
		
	// percentage of the position across the screen multiplied by walk gives us the percentage of the walk to use
	// then minus half the walk to get a pos/neg split across the full value
	const walkX = (x / width * 50) - (50 / 2)
	const walkY = (y / height * 50) - (50 / 2)
	// console.log(walkX, walkY)
	text.style.textShadow = `
		${walkX}px ${walkY}px cyan
	`

	// text.style.textShadow = `
	// 	${walkX}px ${walkY}px cyan, 
	// 	${walkX * -1}px ${walkY}px gold,
	// 	${walkY}px ${walkX * -1}px red, 
	// 	${walkY * -1}px ${walkX}px white
	// `
	const pctX = ((x / width * 100) - 50) 
	const shadowX = (pctX / 100) < 0 ? (pctX / 100) * -1 : (pctX / 100)
	const pctY = ((y / height * 100) - 50) 
	const shadowY = (pctY / 100) < 0 ? (pctY / 100) * -1 : (pctY / 100)
	
	const shadow = (Math.min(0.5 - shadowX, 0.5 - shadowY) * 40) - 20
	// console.log(shadow)
	text.style.boxShadow = `
		${walkX}px 
		${walkY}px 
		${shadow < 0 ? shadow * -1 : shadow}px 

		rgba(0,0,0, ${(Math.min(0.5 - shadowX, 0.5 - shadowY)) + 0.2})
	`

	text.style.transform = `
		perspective(400px)
		rotateX(${((y / height * 40) - 20)}deg)
		rotateY(${((x / width * 40) - 20) * -1}deg)
		scale(${ 1 + (Math.min((walkY < 0 ? walkY * -1 : walkY), (walkX < 0 ? walkX * -1 : walkX)) / 100)})
	`
	
	console.log()
	
}

hero.addEventListener('mousemove', shadow)
