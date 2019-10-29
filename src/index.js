import Scanner from './Scanner'
import { codificationTable } from './LanguageSpecification'

let scanner = new Scanner()
try {
	scanner.scan()
} catch(error) {
	console.log(error.message)
}


console.log('Program Internal Form:')
for (let index in scanner.pif.content) {
	let key = scanner.pif.content[index].code
	let val = scanner.pif.content[index].nodeInST
	if (val !== null) {
		val = val.token
	}
	console.log(`${key} => ${val}`)
}
console.log('\nSymbol Table for Identifiers:')
console.log(scanner.stIdentifiers.toString())
console.log('\nSymbol Table for Constants:')
console.log(scanner.stConstants.toString())
console.log('\nCodification Table:')
for (let key in codificationTable) {
	console.log(`${key} => ${codificationTable[key]}`)
}