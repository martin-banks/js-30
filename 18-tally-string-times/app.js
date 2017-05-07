/* eslint-disable */
"use strict"

const listItems = document.querySelectorAll('[data-time]')
const totalSeconds = Array.from(listItems).reduce((prev, value) => {
	const time = value.dataset.time.split(':')
	const minutes = parseInt(time[0] * 60)
	const seconds = parseInt(time[1])
	return prev + minutes + seconds
}, 0)

function convertTime(sec) {
	const hours = Math.floor(sec / 60 / 60)
	const minutes = Math.floor(sec / 60) - (hours * 60)
	const seconds = sec - (hours * 60 * 60) - (minutes * 60)
	return {
		hours,
		minutes,
		seconds
	}
}

console.log(totalSeconds)
console.log(convertTime(totalSeconds))
