"use strict"
//	Declare the raw data to be used
const state = {
	audioPath: './sounds',
	keys: [
		{
			letter: 'a',
			name: 'Clap',
			sound: '',
			keyCode: 65
		},
		{
			letter: 's',
			name: 'Hihat',
			sound: '',
			keyCode: 83
		},
		{
			letter: 'd',
			name: 'Kick',
			sound: '',
			keyCode: 68
		},
		{
			letter: 'f',
			name: 'Openhat',
			sound: '',
			keyCode: 70
		},
		{
			letter: 'g',
			name: 'Boom',
			sound: '',
			keyCode: 71
		},
		{
			letter: 'h',
			name: 'Ride',
			sound: '',
			keyCode: 72
		},
		{
			letter: 'j',
			name: 'Snare',
			sound: '',
			keyCode: 74
		},
		{
			letter: 'k',
			name: 'Tom',
			sound: '',
			keyCode: 75
		},
		{
			letter: 'l',
			name: 'Tink',
			sound: '',
			keyCode: 76
		}
	]
}

/* set up factory functions to render templates */
function Sound({name, keyCode}){
	const render = ()=> `<audio data-key="${keyCode}" src="${state.audioPath}/${name.toLowerCase()}.wav"></audio>`
	return {render}
}

function Button({letter, name, width, keyCode}) {
	const audio = Sound({name, keyCode})
	const render = () => `<div 
		class="button"
		data-key="${keyCode}"
		style="width:${width}%"
	>
		<p class="letter">${letter}</p>
		<p class="name">${name}</p>
		${audio.render()}
	</div>`

	return {
		render
	}
}

/* Factory to render the full app */
function App({buttons}){
	const render = ()=> `
		<div class="buttonContainer">
			${allButtons.map(button => button.render()).join('<!-- -->')}
		</div>
		<h3 class="messages"></h3>
	`
	return {render}
}



function removeClass(e){
	// event listener will trigger for animated properties
	// we only want to call once or after a particular property has finished
	if(e.propertyName !== 'transform') return 
	this.classList.remove(e.target.classToRemove)
}

//	We want to play a the corresponding sound to the key pressed 
//	and ignore keys that are not mapped to a sound
function playSound(e){
	const {keyCode, key} = e
	const keyPressed = document.querySelector(`.button[data-key="${keyCode}"]`)
	if(!keyPressed) {
		const message = document.querySelector('.messages')
		message.innerText = `${key.toUpperCase()} is not valid`
		message.classList.add('showMessage')
		message.addEventListener('transitionend', removeClass, false)
		message.classToRemove = 'showMessage'
		return
	} // skip rest of function if key is not mapped to a sound
	keyPressed.classList.add('playing')

	const audio = keyPressed.querySelector(`audio[data-key="${keyCode}"`)
	audio.currentTime = 0
	audio.play()

	const buttons = document.querySelectorAll('.button')
	buttons.forEach( button => {
		button.addEventListener('transitionend', removeClass, false)
		button.classToRemove = 'playing'
	})
}



//	create and store all create button objects
const allButtons = state.keys.map( (key,i) => {
	const {name, sound, letter, keyCode} = key
	return Button({
		letter, name, keyCode, width: 100/(state.keys.length + 1)
	})
})

//	create the drum app with all of hte created buttons
//	then render to the container DOM element
//	and begin listening for keyboard events
const drumApp = App({allButtons})
document.querySelector('#app').innerHTML = drumApp.render()
window.addEventListener('keydown', playSound)
