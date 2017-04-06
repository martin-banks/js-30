"use strict"

const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const someAdult = people.some(person => {
	return (person.year <= (new Date()).getFullYear() - 19)
})
console.log({someAdult})
// Array.prototype.every() // is everyone 19 or older?
const allAdult = people.every(person => {
	return (person.year <= (new Date()).getFullYear() - 19)
})
console.log({allAdult})


// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
const findId = comments.find( comment => comment.id === 823423)
console.log({findId})

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
// Using filter, but this is not what the brief asks for
const filterId = comments.filter(comment => comment.id !== 823423)
console.table(filterId)

const removeIndex = comments.findIndex(comment => comment.id === 823423)
console.log({removeIndex})
// Leave array untouched where possible
// This will help minimise confusion over what data is being worked with
// comments.splice(removeIndex, 1)

// Instead create a new array and remove 
const newComments = [ ...comments ]
newComments.splice(removeIndex, 1)

// Better still, create a new array with only the vlues you want
// This has the same benefits of not mutating the data after it's created
const altNewComments = [
	...comments.slice(0, removeIndex),
	...comments.slice(removeIndex + 1)
]


console.table(newComments)
console.table(altNewComments)
