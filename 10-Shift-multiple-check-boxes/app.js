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
const itemTemplate = ({text}) => `<li>
	<input type="checkbox" />
	<label>${text}</label>
</li>`

// iterate over text strings and apply to list template ...
const listTemplate = list => `<ul>${list.map( (text,i) => itemTemplate({text}) ).join('')}</ul>`

// ... and render to dom 
document.querySelector('#app').innerHTML = listTemplate(listText)



// Handling select-in-between
// values used to check app status 
let first = null
let last = null

// select all inputs with chceckbox type in DOM
let checkBoxes = document.querySelectorAll('input[type="checkbox"]')

// will check to see if shift is held 
// and if there are any checkboxes inbetween to toggle
function handleClick(checkbox, index){
	checkbox.addEventListener('change', function(e){
		// shiftKey is a method on the click event
		// no need to separately check/listen for key down envent on shiftKey
		if(e.shiftKey) {
			// shift is not pressed, only set the first value and store it as first
			first = index
			return
		} else {
			// shift has been pressed.
			if(!!first){
				// check that there is a first value to calculate from
				// set the last value and iterate over the check boxes in-between
				last = index
				// toggle all in between
				// choose the lowest of first/last as starting point
				// and highest as end point for toggling
				for (let i = Math.min(first,last)+1; i < Math.max(first,last);  i++){
					// toggle checked status
					checkBoxes[i].checked = !checkBoxes[i].checked ? true : false
				}
				// All toggling done, reset the first and last values ready to begin again
				first = null
				last = null
				return
			} else {
				// shift has been pressed when selecting the first checkbox, 
				// nothing to iterate in between over
				first = index
				return
			}
		}
	})
}

// run setData against all checkboxes
checkBoxes.forEach( handleClick )




/*
// Wes Bos solution
// only works for turning checks on
const checkBoxes = document.querySelectorAll('input[type="checkbox"]')
let lastClicked;

function handleCheck(e){
	let inBetween = false
	if (e.shiftKey && this.checked) {
		checkBoxes.forEach(checkbox => {
			if(checkbox === this || checkbox === lastClicked ){
				inBetween = !inBetween
			}
			if (inBetween) checkbox.checked = true
		})
	}
	lastClicked = this
}

checkBoxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck))
*/
