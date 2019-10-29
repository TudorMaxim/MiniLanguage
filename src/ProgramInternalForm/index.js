export default class ProgramInternalForm {
	constructor() {
		this.content = []
	}

	add(code, nodeInST) {
		this.content.push({
			code,
			nodeInST
		})
	}

	toString() {
		return this.content.toString()
	}
}