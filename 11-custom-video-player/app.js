"use strict"

// get elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')

let rangeActive = false
let scrubActive = false

// functions
function togglePlay() {
	const method = video.paused ? 'play' : 'pause'
	video[method]()
}
function updateButton() {
	toggle.textContent = this.paused ? '▶' : '❚ ❚'
}
function skipVideo(e) {
	video.currentTime += parseFloat(this.dataset.skip)
}
function handleRangeUpdate(e){
	if (rangeActive) video[this.name] = this.value
}

function updateProgressBar() {
	let progress = video.currentTime / video.duration * 100
	progressBar.style.width = `${progress}%`
	progressBar.style.flexBasis = `${progress}%`
}

function scrub(e) {
	let clickPosition = e.offsetX
	let videoWidth = progress.offsetWidth
	let duration = video.duration
	video.currentTime = duration * (clickPosition / videoWidth)
}
function toggleFullscreen(e) {
	video.webkitEnterFullScreen()
}


// event listeners
toggle.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
window.addEventListener('keypress', e => {
	if (e.keyCode === 32) togglePlay()
})

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
 
skipButtons.forEach(skip => skip.addEventListener('click', skipVideo))
ranges.forEach(range => {
	range.addEventListener('change', handleRangeUpdate)
	range.addEventListener('mousedown', e => rangeActive = true)
	range.addEventListener('mousemove', handleRangeUpdate)
})

window.addEventListener('mouseup', e => rangeActive = false)

video.addEventListener('timeupdate', updateProgressBar)
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', e => scrubActive = true)
progress.addEventListener('mouseup', e => scrubActive = false)
progress.addEventListener('mousemove', e => scrubActive && scrub(e) )

fullscreen.addEventListener('click', toggleFullscreen)
