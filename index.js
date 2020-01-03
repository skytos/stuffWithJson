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
	handleItems
])

pipeline.on('data', () =>{})
pipeline.on('end', () => console.log('XXXXXXXX   all done'))

function delay(ms) {
	return new Promise(f => setTimeout(f, ms))
}

async function handleItems(items) {
	console.log('starting ' + items[0].value.id)
	await delay(10)
	console.log('finishing ' + items[items.length-1].value.id)
}
