"use strict"

 const images = [
		`https://source.unsplash.com/gYl-UtwNg_I/1500x1500`,
		`https://source.unsplash.com/1CD3fd8kHnE/1500x1500`,
		`https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&cro&fit=crop&s=967e8a713a4e395260793fc8c802901d`,
		`https://source.unsplash.com/ITjiVXcwVng/1500x1500`,
		`https://source.unsplash.com/3MNzGlQM7qs/1500x1500`
 ]
const text = [
	[ `hey`, `let's`, `dance` ],
	[ `Give`, `take`, `recieve` ],
	[ `Exprience`, `it`, `today` ],
	[ `Give`, `all`, `you can` ],
	[ `Life`, `in`, `motion` ]
]

function Panel({index=0, text=[], image=''}={}) {
	const render = ()=> `<div 
		class="panel panel-${index}"
		style="background-image: url(${image})"
	>
		<p>${text[0]}</p>
		<p>${text[1]}</p>
		<p>${text[2]}</p>
	</div>`
	return {render}
}

const PanelContainer = ({content=[]}={})=> `<div class="panels">${content.join('')}</div>`

let Panels = images.map( (image, i) => Panel({
	image: images[i], text: text[i], index: i
}) )

let App = PanelContainer({content: Panels.map(panel => panel.render())})

document.querySelector('#app').innerHTML = App




function togglePanel(e){
	this.classList.toggle('open')
	Array.from(document.querySelectorAll('.panel'))
		.forEach(panel => {
			if (panel === this) return
			panel.classList.remove('open')
		})
}

function toggleActive(e){
	if(e.propertyName.includes('flex')){
		this.classList.toggle('active')
	}
}

document.querySelectorAll('.panel')
	.forEach(panel => {
		panel.addEventListener('click', togglePanel)
		panel.addEventListener('transitionend', toggleActive)
	})



