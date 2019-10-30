import SymbolTable from '../SymbolTable'
import ProgramInternalForm from '../ProgramInternalForm'
import fs from 'fs'
import path from 'path'
import {
	identifierRegex,
	constantRegex,
	codificationTable,
	reservedWords,
	operators,
	separators
} from '../LanguageSpecification'

export default class Scanner {
    
	constructor() {
		this.pif = new ProgramInternalForm()
		this.stConstants = new SymbolTable()
		this.stIdentifiers = new SymbolTable()
	}

	isIdentifier(token) {
		return identifierRegex.test(token)
	}

	isConstant(token) {
		return constantRegex.test(token)
	}

	getCharToken(line, i, lineCnt) {
		let token = line[i] + line[i + 1] + line[i + 2]
		if (line[i] !== '\'' || line[i + 2] != '\'') {
			throw new Error(`Lexical error at line ${lineCnt}: Invalid character ${token}.`)
		}
		return {
			token, 
			index: i + 3
		}
	}

	getStringToken(line, i, lineCnt) {
		let token = ''
		let quotesCnt = 0
		while (i < line.length && quotesCnt < 2) {
			if (line[i] === '"') {
				quotesCnt++
			}
			token += line[i]
			i++
		}
		if (i === line.length) {
			throw new Error(` Lexical error at line ${lineCnt}: Invalid string ${token}.`)
		}
		return {
			token: token,
			index: i
		}
	}

	getOperator(line, i) {
		let token = line[i]
		if (operators.includes(`${token}${line[i + 1]}`)) {
			return {
				token: token + line[i + 1],
				index: i + 2
			}
		}
		return {
			token,
			index: i + 1
		}
	}

	generateTokens(line, lineCnt) {
		let tokens = []
		let i = 0
		let token = ''
		while (i < line.length) {
			if (line[i] === '\'') {
				if (token) {
					tokens.push(token)
				}
				let ret = this.getCharToken(line, i, lineCnt)
				tokens.push(ret.token)
				token = ''
				i = ret.index
			} else if (line[i] === '"') {
				if (token) {
					tokens.push(token)
				}
				let ret = this.getStringToken(line, i, lineCnt)
				tokens.push(ret.token)
				token = ''
				i = ret.index
			} else if (operators.includes(line[i])) {
				if (token) {
					tokens.push(token)
				}
				let ret = this.getOperator(line, i)
				tokens.push(ret.token)
				token = ''
				i = ret.index
			} else if (separators.includes(line[i])) {
				if (token) {
					tokens.push(token)
				}
				tokens.push(line[i])
				i++
				token = ''
			} else {
				token += line[i]
				i++
			}
		}
		return tokens
	}

	scan() {
		let codeFilePath = path.join(__dirname, '..\\..\\') + '\\code.txt'
		let code = fs.readFileSync(codeFilePath).toString().split('\n')
		let lineCnt = 0
		let lexicon = [
			...separators,
			...operators,
			...reservedWords
		]
		for (let line of code) {
			++lineCnt
			for (let token of this.generateTokens(line, lineCnt)) {
				if (lexicon.includes(token)) {
					this.pif.add(codificationTable[token], null)
				} else if (this.isConstant(token)) {
					let node = this.stConstants.add(token)
					this.pif.add(codificationTable['constant'], node)
                } else if (this.isIdentifier(token)) {
                    let node = this.stIdentifiers.add(token)
                    this.pif.add(codificationTable['identifier'], node)
                } else {
					throw new Error(`Lexical Error at line ${lineCnt}: Unknown token ${token}`)
				}
			}
		}
	}
}