"use strict"

const state = {}

function Clock() {
	/*const time = ()=> new Date()
	const hours = ()=> time().getHours()
	const minutes = ()=> time().getMinutes()
	const seconds = ()=> time().getSeconds()

	const calcHours = ()=> {
		const newHours = hours() > 12 ? hours() - 12 : hours()
		return (((newHours / 12) * 360) - 90) + (minutes()/60 * 12)
	}
	const calcMins = ()=>  (( (minutes() / 60) * 360)) - 90
	const calcSecs = ()=> (((seconds() / 60) * 360)) - 90 */
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
			<div class="hand second-hand" ></div>
			<div class="hand hour-hand" ></div>
			<div class="hand minute-hand" ></div>	
		</div>	
	</div>`

	return { render }
}

function setTime() {
	const time = ()=> new Date()
	const hours = ()=> time().getHours()
	const minutes = ()=> time().getMinutes()
	const seconds = ()=> time().getSeconds()

	function calcHours(){
		const newHours = hours() > 12 ? hours() - 12 : hours()
		return (((newHours / 12) * 360) - 90) + (minutes()/60 * 12)
	}
	const calcMins = ()=>  (( (minutes() / 60) * 360)) - 90
	const calcSecs = ()=> (((seconds() / 60) * 360)) - 90 
	return {
		calcHours,
		calcMins,
		calcSecs
	}
}

const time = setTime()
const myClock = Clock({
	hours:time.calcHours(),
	minutes: time.calcMins(),
	seconds: time.calcSecs()
})
const setTimeValues = () => {
	const hourHand = document.querySelector('.hour-hand')
	const minuteHand = document.querySelector('.minute-hand')
	const secondHand = document.querySelector('.second-hand')

	hourHand.style.transform = `rotate(${time.calcHours()}deg)`
	minuteHand.style.transform = `rotate(${time.calcMins()}deg)`
	secondHand.style.transform = `rotate(${time.calcSecs()}deg)`
}


document.querySelector('#app').innerHTML = myClock.render()
const updateTime = setInterval(()=>{
	setTimeValues()
}, 1000)


