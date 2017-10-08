/* eslint no-console: 0 */

let countdown = null
const timeLeft = document.querySelector('h1.display__time-left')
const buttons = document.querySelectorAll('button')

function handleInterval(then) {
	const secondsLeft = Math.round((then - Date.now()) / 1000)
	if (secondsLeft < 0) return clearInterval(countdown)
	displayTimeLeft(secondsLeft)
	
}
function timer(seconds) {
	const now = Date.now()
	const then = now + (seconds * 1000)
	displayTimeLeft(seconds)
	clearInterval(countdown)
	countdown =	setInterval(handleInterval.bind(null, then), 1000)
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60)
	const remainderSeconds = seconds % 60
	// console.log({ minutes, remainderSeconds })
	timeLeft.innerHTML = `${minutes}:${('0' + remainderSeconds).slice(-2)}`
}

buttons.forEach(button => {
	console.log({ button })
	button.addEventListener('click', timer.bind(null, button.getAttribute('data-time')))
})
// timer(130)
