"use strict"

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
]

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William']

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const bornIn1500s = inventors.filter(inventor => {
	if (inventor.year >= 1500 && inventor.year <= 1599) return true
})
/*
const bornIn1500s = inventors.filter(inventor => inventor.year >= 1500 && inventor.year <= 1599)
*/
console.log('1. Born in the 1500s')
console.table( bornIn1500s )

// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
const inventorNames = inventors.map(inventor => {
	return `${inventor.first} ${inventor.last}`
})
console.log('2. Array of inventor names\n', inventorNames)

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
//const sortedByYear = inventors.sort( (a,b) => a.year - b.year )
const sortedByYear = inventors.sort( (a,b) => a.year > b.year ? 1 : -1 )
console.log('3. Sort by year, oldest first')
console.table(sortedByYear)

// Array.prototype.reduce()
// 4. How many years did all the inventors live?
const totalYears = inventors.reduce((total,inventor) => {
	const {year, passed} = inventor
	return total + (passed - year)
}, 0)
console.log('4. total years lived', totalYears)


// 5. Sort the inventors by years lived
const sortedYearsLived = inventors.sort( (a,b)=>{
	//return (a.passed - a.year) - (b.passed - b.year)	
	// change -1 or for different orders
	// a > b returns -1 will order by highest first 
	return (a.passed - a.year) > (b.passed - b.year) ? -1 : 1
})
console.log('5. Sorted by years lived')
console.table(sortedYearsLived)

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
/*const boulevards = [
	`Boulevards of Paris`,`City walls of Paris`,`Thiers wall`,`Wall of Charles V`,`Wall of Philip II Augustus`,`City gates of Paris`,`Haussmann's renovation of Paris`,`Boulevards of the Marshals`,`Boulevard Auguste-Blanqui`,`Boulevard Barbès`,`Boulevard Beaumarchais`,`Boulevard de l'Amiral-Bruix`,`Boulevard des Capucines`,`Boulevard de la Chapelle`,`Boulevard de Clichy`,`Boulevard du Crime`,`Boulevard Haussmann`,`Boulevard de l'Hôpital`,`Boulevard des Italiens`,`Boulevard de la Madeleine`,`Boulevard de Magenta`,`Boulevard Montmartre`,`Boulevard du Montparnasse`,`Boulevard Raspail`,`Boulevard Richard-Lenoir`,`Boulevard de Rochechouart`,`Boulevard Saint-Germain`,`Boulevard Saint-Michel`,`Boulevard de Sébastopol`,`Boulevard de Strasbourg`,`Boulevard du Temple`,`Boulevard Voltaire`,`Boulevard de la Zone`
]*/

const boulevards = document.querySelectorAll('.mw-category li')
const boulevardsWithDe = Array.from(boulevards)
	.map(boulevard => boulevard.innerText)
	.filter(boulevard => boulevard.includes('de'))

console.log(`6. boulevards with 'de' in them\n`, boulevardsWithDe)

// const boulevardsDe = boulevardText.filter(boulevard => {
// 	return boulevard.split(' ').indexOf('de') !== -1 ? true : false
// })



// 7. sort Exercise
// Sort the people alphabetically by last name
const namesSorted = people.sort((a,b)=>{
	/*let first = (a.split(', ')[1].toUpperCase())
	let second = (b.split(', ')[1].toUpperCase())
	if (first < second) return -1
	if (first > second) return 1
	return 0*/

	// Wes Bos solution
	// when splitting a string the results can be destructured into named values
	let [secondNameA, firstNameA] = a.split(', ')
	let [secondNameB, firstNameB] = b.split(', ')
	if (secondNameA === secondNameB) return 0
	return secondNameA > secondNameB ? 1 : -1
})
console.log('7. People sorted by surname\n', namesSorted)

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

const sumTotal = data.reduce( (result, entry)=>{
	if(!result[entry]) result[entry] = 0
	result[entry]++
	return result
},{})


console.log('8. reduce sum total')
console.log(sumTotal)