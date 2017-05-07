"use strict"

const menuTemplate = () => `<div class="wrapper">
	<h2>Local tapas</h2>
	<ul class="plates">
		<li>Loading tapas</li>
	</ul>
	<form action="" class="add-items">
		<input type="text" name="item" placeholder="Item name" />
		<input type="submit" value="+ Add Item" />
	</form>
	<button data-type="clear" class="change-all">Clear all items</button>
	<button data-type="check" class="change-all">Check all items</button>
	<button data-type="uncheck" class="change-all">Un-Check all items</button>
</div>`

// reset incase i've done something stupid
// localStorage.setItem('items', JSON.stringify([]))

const APP = document.querySelector('#app')
APP.innerHTML = menuTemplate()

const addItems = document.querySelector('.add-items')
const itemsList = document.querySelector('.plates')
const items = JSON.parse(localStorage.getItem('items'))
const buttons = document.querySelectorAll('button')


function addItem(e) {
	e.preventDefault()
	const text = this.querySelector('[name="item"').value
	const item = {
		text,
		done: false,
	}
	items.push(item)
	localStorage.setItem('items', JSON.stringify(items))
	populateList(items, itemsList)
	this.reset()
}

function populateList(plates = [], platesList) {
	platesList.innerHTML = plates.map((plate, i) => `
		<li>
			<input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''} />
			<label for="item${i}">${plate.text}</label>
		</li>
	`).join('')
}

function toggleTaco(e) {
	const { target } = e
	if (target.type === 'checkbox') {
		const index = parseInt(target.dataset.index, 10)
		items[index].done = !items[index].done
		localStorage.setItem('items', JSON.stringify(items))
	}
}

function handleButton(e) {
	const type = e.target.dataset.type
	const update = items.map(item => {
		if (type === 'check') item.done = true
		if (type === 'uncheck') item.done = false
		if (type === 'clear') item = null
		return item
	}).filter(item => !!item)
	localStorage.setItem('items', JSON.stringify(update))
	populateList(update, itemsList)
}

populateList(items, itemsList)
addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleTaco)
buttons.forEach(button => button.addEventListener('click', handleButton))

