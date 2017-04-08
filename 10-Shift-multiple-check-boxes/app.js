"use strict"

const listText = [
	'Some list item',
	'Some list item',
	'Some list item',
	'Some list item',
	'Some list item',
	'Some list item',
	'Some list item',
	'Some list item'
]

const itemTemplate = ({text, i}) => `<li>
	<input 
		type="checkbox" 
		data-index="${i}"/>
	<p>${text}</p>
</li>`

const listTemplate = list => `<ul>${list.map( (text,i) => itemTemplate({text,i}) ).join('')}</ul>`

document.querySelector('#app').innerHTML = listTemplate(listText)

let first = null
let last = null
let shift = false
let checkBoxes = document.querySelectorAll('input')

function setData(checkbox){
	checkbox.addEventListener('change', function(){
		let index = parseInt(this.dataset.index)
		if(!shift) {
			// shift is not pressed, set first value
			first = index
		} else {
			// shift has been pressed.
			if(!!first){
				last = index
				// toggle all in between
				for (let i = first+1; i < last; i++){
					checkBoxes[i].checked = !checkBoxes[i].checked ? true : false
				}
				first = null
				last = null
			} else {
				first = index
			}
		}
	})
}

window.addEventListener('keydown', e => shift = e.keyCode === 16 ? true : false )
window.addEventListener('keyup', e => shift = false)

checkBoxes.forEach( setData )