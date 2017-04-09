"use strict"
let sequence = [	
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a',
	'Enter'
]	
let pressed = []

window.addEventListener('keyup', e => {
	pressed.push(e.key)
	if (pressed.length > sequence.length) pressed.shift()
	console.log(pressed)

	if(pressed.join('').toLowerCase() === sequence.join('').toLowerCase() ) {
		console.log('%cKONAMI CODE!!!', 'font-size: 50px')
	}

	/*if( pressed.join('').toLowerCase().includes(sequence.join('').toLowerCase() )) {
		console.log('%cKONAMI CODE!!!', 'font-size: 50px')
	}*/
	
})