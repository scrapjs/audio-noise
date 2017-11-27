//audio-noise demo

'use strict'

const write = require('web-audio-write')()
const noise = require('./')({color: 'white', format: 'stereo audiobuffer'})

;(function tick(err) {
	if (err) throw err
	write(noise(), tick)
})()

setTimeout(x => {
	write(null)
}, 1000)
