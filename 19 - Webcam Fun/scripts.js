const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const sliders = document.querySelectorAll('.rgb input')

function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
		.then(localMediaStream => {
			console.log(localMediaStream)
			video.src = window.URL.createObjectURL(localMediaStream)
			video.play()
		})
		.catch(err => console.error('oh noooo!!', err ))
}

function paintToCanvas() {
	const width = video.videoWidth
	const height = video.videoHeight
	canvas.width = width
	canvas.height = height

	// return the setInterval so we have access to it later
	// this means we can clear it if needed
	return setInterval(() => {
		// get the video and render to canvas
		ctx.drawImage(video, 0, 0, width, height)
		// get the pixels of the canvas iamge
		const pixels = ctx.getImageData(0, 0, width, height)
		// console.log(pixels)
		// do something with hte pixels
		const updatedPixels = greenScreen(pixels)
		// debugger
		// put them back into the canvas
		ctx.putImageData(updatedPixels, 0, 0)
		// debugger
	}, 16)
}

function takePhoto() {
	// reset audio timeline before playing sound means we can spam the button and will always play from beginning
	snap.currentTime = 0
	snap.play()

	// take the data out of the canvas
	const data = canvas.toDataURL('image/jpeg')
	const link = document.createElement('a')
	link.href = data
	link.setAttribute('download', 'handsome')
	link.innerHTML = `<img src="${data}" alt="" />`
	strip.insertBefore(link, strip.firstChild)
}

function madFilter(pixels) {
	const random = parseInt(Math.min(Math.random() * 10), 10)
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - random + 0] = pixels.data[i + 0]
		pixels.data[i - random + 1] = pixels.data[i + 1]
		pixels.data[i - random + 2] = pixels.data[i + 2]
		// pixels.data[i + random + 3] = pixels.data[i + 3]
	}
	return pixels
}


// pixels.data is an array of numbers each coresponding to rgba values
// looping over each 4 means we can change the value of any channel for each pixel
// after pixel values have been changed they are returned to update the canvas
function redFilter(pixels) {
	// adds a red cast by increasing the red saturation of each 
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 120
		pixels.data[i + 1] = pixels.data[i + 1]
		pixels.data[i + 2] = pixels.data[i + 2]
		// pixels.data[i + 3] = pixels.data[i + 3] - 150
	}
	return pixels
}

function monoFilter(pixels) {
	// making all chanels have hte same value will result in a mono image
	// choose one channel as the base
	// different channels will give give different results
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] = pixels.data[i + 2]
		pixels.data[i + 1] = pixels.data[i]
		pixels.data[i + 2] = pixels.data[i]
		// pixels.data[i + 3] = pixels.data[i + 3] - 150
	}
	return pixels
}

// create a greenscreen effect where we set pixels to transparent if they are a specific color
// we have already selected all the input sliders
function greenScreen(pixels) {
	// get the values of each slider and store in an object
	const levels = {}
	sliders.forEach(slide => {
		levels[slide.name] = slide.value
	})
	// destructure values for easier use
	const { rmin, rmax, gmin, gmax, bmin, bmax} = levels
	for (let i = 0; i < pixels.data.length; i += 4) {
		// get the color values for each channel ready to check
		const r = pixels.data[i + 0]
		const g = pixels.data[i + 1]
		const b = pixels.data[i + 2]
		const a = pixels.data[i + 3]

		// If all rgb values for each pixel falls in the range specified by the slider values...
		if (
			r >= rmin &&
			r <= rmax &&
			g >= gmin &&
			g <= gmax &&
			b >= bmin &&
			b <= bmax) {
			// ... do something; set it the alpha channel to 0 ; transparent
			pixels.data[i + 3] = 0
		}
	}
	return pixels

}

getVideo()
video.addEventListener('canplay', paintToCanvas)
