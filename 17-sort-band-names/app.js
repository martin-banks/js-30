"use strict"



const APP = document.querySelector('#app')
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];


// my solution
const articles = [
	'a',
	'an',
	'the',
]
// function removeArticle(word) {
// 	const aHasArticle = articles.indexOf(word.split(' ')[0].toLowerCase()) !== -1
// 	return aHasArticle ? word.split(' ')[1] : word
// }
// const sorted = bands.sort((a, b) => removeArticle(a) > removeArticle(b) ? 1 : -1)

// wes bos solution
function removeArticle(word) {
	//  ^ means 'begins with'. i is case insensitive
	return word.replace(/^(a |the |an )/i, '').trim()
}

const sorted = bands.sort((a, b) => removeArticle(a) > removeArticle(b) ? 1 : -1)


APP.innerHTML = `<ul>
	${sorted.map(band => `<li>${band}</li>`).join('')}
</ul>`

