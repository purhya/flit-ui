const fs = require('fs')
const path = require('path')


function copyFileOrFolder(from, to) {
	if (fs.statSync(from).isDirectory()) {
		for (let name of fs.readdirSync(from)) {
			copyFileOrFolder(from + '/' + name, to + '/' + name)
		}
	}
	else {
		ensureDir(to)
		fs.copyFileSync(from, to)
	}
}


function ensureDir(filePath) {
	let parentPath = path.dirname(filePath)

	if (!fs.existsSync(parentPath)) {
		ensureDir(path.dirname(parentPath))
		fs.mkdirSync(parentPath)
	}
}


let src = __dirname + '/../src/icons/icons'
let dest = __dirname + '/../out/icons/icons'
copyFileOrFolder(src, dest)