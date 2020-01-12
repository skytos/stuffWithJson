const fs = require('fs'),
	{ parser } = require('stream-json'),
	{ chain } = require('stream-chain'),
	{ streamArray } = require('stream-json/streamers/StreamArray')
	Batch = require('stream-json/utils/Batch')

async function main() {
	const pipeline = chain([
		fs.createReadStream('temp.json'),
		parser(),
		streamArray(),
		new Batch({batchSize: 10}),
	])

	for await (let chunk of pipeline) {
		console.log('XXX')
		console.log(chunk)
	}
}
main()
