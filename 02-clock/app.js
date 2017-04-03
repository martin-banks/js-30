"use strict"

const state = {}

function Clock() {
	const time = ()=> new Date()
	const hours = ()=> time().getHours()
	const minutes = ()=> time().getMinutes()
	const seconds = ()=> time().getSeconds()

	const calcHours = ()=> {
		const newHours = hours() > 12 ? hours() - 12 : hours()
		return (((newHours / 12) * 360) - 90) + (minutes()/60 * 12)
	}
	const calcMins = ()=>  (( (minutes() / 60) * 360)) - 90
	const calcSecs = ()=> (((seconds() / 60) * 360)) - 90 
	const ticks = ()=> {
		let allTicks = []
		for(let i = 0; i < 12; i++){
			allTicks.push(`<div class="tick" style="transform: rotate(${i * (360/12)}deg)"></div>`)
		}
		return `<div class="tick-hours">${allTicks.join('')}</div>`
	}
	const render = () => `<div class="clock">
		<div class="face">
			${ticks()}
			<div class="hand second" style="transform: rotate(${calcSecs()}deg)"></div>
			<div class="hand hour" style="transform: rotate(${calcHours()}deg)"></div>
			<div class="hand minute" style="transform: rotate(${calcMins()}deg)"></div>	
		</div>	
	</div>`

	return { render }
}

const myClock = Clock()
const loadClock = setInterval(()=>{
	document.querySelector('#app').innerHTML = myClock.render()
}, 1000)


