/* eslint-disable */
"use strict"

const textTemplate = `<div class="hero">
	<h1>🔥WHOA!!</h1>
</div>`
const APP = document.querySelector('#app')
APP.innerHTML = textTemplate

const hero = document.querySelector('.hero')
const text = hero.querySelector('h1')
const walk = 200 // 100px
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
	const walkX = (x / width * walk) - (walk / 2)
	const walkY = (y / height * walk) - (walk / 2)
	// text.style.textShadow = `
	// 	${walkX}px ${walkY}px cyan, 
	// 	${0-walkX}px ${walkY}px gold,
	// 	${walkY}px ${0-walkX}px red, 
	// 	${0-walkY}px ${walkX}px white
	// `

	text.style.textShadow = `
		${walkX}px ${walkY}px cyan, 
		${walkX * -1}px ${walkY}px gold,
		${walkY}px ${walkX * -1}px red, 
		${walkY * -1}px ${walkX}px white
	`
	
	console.log()
	
}

hero.addEventListener('mousemove', shadow)
