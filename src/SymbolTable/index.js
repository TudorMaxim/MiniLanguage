class Node {
	constructor(val = null, next = null, prev = null) {
		this.token = val
		this.next = next
		this.prev = prev
	}
}

export default class SymbolTable {

	constructor() {
		this.head = null
		this.tail = this.head
	}

	insertAfter(node, token) {
		let newNode = new Node(token)
		if (node.next === null) {
			newNode.prev = this.tail
			this.tail.next = newNode
			this.tail = newNode
			return newNode
		}
		let nextNode = node.next
		newNode.prev = node
		newNode.next = nextNode
		nextNode.prev = newNode
		node.next = newNode
		return newNode
	}

	insertBefore(node, token) {
		let newNode = new Node(token)
		if (node.prev === null) {
			newNode.next = this.head
			this.head.prev = newNode
			this.head = newNode
			return newNode
		}
		let prevNode = node.prev
		newNode.prev = prevNode
		newNode.next = node
		prevNode.next = newNode
		node.prev = newNode
		return newNode
	}

	add(token) {
		if (this.head === null) {
			let node = new Node(token)
			this.head = node
			this.tail = this.head
			return node
		}
		if (token > this.tail.token) {
			return this.insertAfter(this.tail, token)
		} 
		if (token < this.head.token) {
			return this.insertBefore(this.head, token)
		}
		let node = this.head
		while (node.token < token) {
			node = node.next
		}
		if (node.token === token) {
			return node
		}
		return this.insertBefore(node, token)
	}

	toString() {
		let s = ''
		for (let it = this.head; it !== null; it = it.next) {
			s += `${it.token}, `
		}
		return s.slice(0, -2)
	}
}