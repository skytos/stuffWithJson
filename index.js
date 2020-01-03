const fs = require('fs'),
	{ parser } = require('stream-json'),
	{ chain } = require('stream-chain'),
	{ streamArray } = require('stream-json/streamers/StreamArray'),
	emit = require('stream-json/utils/emit')


const pipeline = chain([
	fs.createReadStream('temp.json'),
	parser(),
	streamArray(),
	handleItem
]);
emit(pipeline)

pipeline.on('end', () => console.log('XXXXXXXX   all done'))

function delay(ms) {
	return new Promise(f => setTimeout(f, ms))
}

async function handleItem(item) {
	console.log('starting ' + item.value.id)
	await delay(10)
	console.log('finishing ' + item.value.id)
}
