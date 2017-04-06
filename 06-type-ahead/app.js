"use strict"

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

function Input({}={}){
	const render = ()=> `<form action="">
		<input 
			type="text"
			placeholder="Type something" 
		/>
	</form>`
	return { render }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


const result = ({city='', state='', population=''}={}) => `<div class="result">
	<ul>
		<li>STATE: </li>
		<li class="state">
			${state}
		</li>
	</ul>
	
	<ul>
		<li>CITY: </li>
		<li class="city">
			${city}
		</li>
	</ul>
	<ul>
		<li>Population:</li>
		<li class="population">${numberWithCommas(population)}</li>
	</ul>
	
</div>`



let search = Input()
let App = `
	${search.render()}
	<div class="resultContainer">
		Loading...
	</div>` 


const highlight = ({text, index}) => `<span class="highlight">
	${text.slice(0, index)}</span>${text.slice(index)}`

function renderResults(e){
	/*console.table(e.target.resultData)*/
	let search = e.target.value.toUpperCase()

	let filteredCities = e.target.resultData.filter( data => {
		let city = data.city.slice(0, search.length).toUpperCase()
		let state = data.state.slice(0, search.length).toUpperCase()
		return search === city || search === state
	})

	let mappedCities = filteredCities.map(entry => {
		let state = search === entry.state.slice(0, search.length).toUpperCase() ? highlight({text: entry.state, index: search.length}) : entry.state
		let city = search === entry.city.slice(0, search.length).toUpperCase() ? highlight({text: entry.city, index: search.length}) : entry.city
		return result({state, city, population:entry.population})
	})
	return mappedCities.join('')
}

function updateResults(data){
	document.querySelector('.resultContainer')
		.innerHTML = renderResults(data)
}



fetch(endpoint)
	.then( response => response.json() )
	.then( data =>  {	
		document.querySelector('#app').innerHTML = App

		const input = document.querySelector('input')
		input.addEventListener('keyup', updateResults)
		input.resultData = data

	})
	.catch( err => console.error(err) )

