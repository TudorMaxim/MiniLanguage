export const reservedWords = [
    'var', 'array', 'of', 'int', 'bool', 'char', 'string', 'read', 'write', 
    'if', 'else', 'do', 'while', 'for', 'and', 'or', 'not'
]

export const operators = [
	'+', '-', '*', '/', '%', '=',  '==', '!=', '<', '>', '<=', '>='
]

export const separators = [
    '(', ')', '[', ']', '{', '}', ':', ';', ',', ' '
]

export const identifierRegex = /^(?=.{1,8}$)_{0,1}[a-zA-Z]+\d*$/
// constRegex = <bool> | <int> | <char> | <string>
export const constantRegex = /^(true|false|\d{1}|[+-]{1}[1-9]{1}|[1-9]{1}\d*|[+-]{1}[1-9]{1}\d*|'[a-zA-Z0-9]{1}'|"[a-zA-z0-9 ]*")$/

const codes = {
	'identifier': 0,
	'constant': 1
};

[...reservedWords, ...operators, ...separators].forEach((val, index) => {
	codes[val] = index + 2
})

export const codificationTable = codes


