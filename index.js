const fs = require('fs'),
	{ parser } = require('stream-json'),
	{ chain } = require('stream-chain'),
	{ streamArray } = require('stream-json/streamers/StreamArray')
	Batch = require('stream-json/utils/Batch')

const pipeline = chain([
	fs.createReadStream('temp.json'),
	parser(),
	streamArray(),
	new Batch({batchSize: 10}),
])

const iterator = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				let value = pipeline.read();
				return { value, done: !value } } } } }

for (let chunk of iterator) {
	console.log('XXX')
	console.log(chunk)
}

