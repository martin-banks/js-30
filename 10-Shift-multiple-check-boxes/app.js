"use strict"
//  Our list data ...
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
// ... and the list template.
const itemTemplate = ({text, i}) => `<li>
	<input 
		type="checkbox" 
		data-index="${i}"/>
	<p>${text}</p>
</li>`

// iterate over text strings and apply to list template ...
const listTemplate = list => `<ul>${list.map( (text,i) => itemTemplate({text,i}) ).join('')}</ul>`

// ... and render to dom 
document.querySelector('#app').innerHTML = listTemplate(listText)

// values used to check app status 
let first = null
let last = null
let shift = false

// select all inputs with chceckbox type in DOM
let checkBoxes = document.querySelectorAll('input[type="checkbox"]')

// will check to see if shift is held 
// and if there are any checkboxes inbetween to toggle
function setData(checkbox){
	checkbox.addEventListener('change', function(){
		let index = parseInt(this.dataset.index)
		if(!shift) {
			// shift is not pressed, only set the first value
			first = index
			return
		} else {
			// shift has been pressed.
			if(!!first){
				// check that there is a first value to calculate from
				// set the last value and iterate over the check boxes in-between
				last = index
				// toggle all in between
				for (let i = first+1; i < last; i++){
					checkBoxes[i].checked = !checkBoxes[i].checked ? true : false
				}
				// reset the first and last values ready to begin again
				first = null
				last = null
				return
			} else {
				// shift has been pressed when selecting hte first checkbox, 
				// nothing to itterate in between over
				first = index
				return
			}
		}
	})
}

// Start listening for shift-key presses
window.addEventListener('keydown', e => shift = e.keyCode === 16 ? true : false )
window.addEventListener('keyup', e => shift = false)

// run setData against all checkboxes
checkBoxes.forEach( setData )