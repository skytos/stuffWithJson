const fs = require('fs'),
	{ parser } = require('stream-json'),
	{ chain } = require('stream-chain'),
	{ streamArray } = require('stream-json/streamers/StreamArray')
	Batch = require('stream-json/utils/Batch')

function* makeIterator() {
	const pipeline = chain([
		fs.createReadStream('temp.json'),
		parser(),
		streamArray(),
		new Batch({batchSize: 10}),
	])
	let value
	while (value = pipeline.read())
		yield value
}

const iterator = makeIterator()
for (let chunk of iterator) {
	console.log('XXX')
	console.log(chunk)
}
