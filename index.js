/**
 * @module  audio-noise
 */

'use strict'

const through = require('audio-through')

const noises = {
	white: (arr) => {
		for (let i = 0, l = arr.length; i < l; i++) {
			arr[i] = Math.random() * 2 - 1
		}

		return arr
	},

	pink: (arr, s) => {
		if (s.b0 == null) {
			s.b0 = s.b1 = s.b2 = s.b3 = s.b4 = s.b5 = s.b6 = 0
		}

		for (let i = 0, l = arr.length; i < l; i++) {
			let white = Math.random() * 2 - 1
			s.b0 = 0.99886 * s.b0 + white * 0.0555179
			s.b1 = 0.99332 * s.b1 + white * 0.0750759
			s.b2 = 0.96900 * s.b2 + white * 0.1538520
			s.b3 = 0.86650 * s.b3 + white * 0.3104856
			s.b4 = 0.55000 * s.b4 + white * 0.5329522
			s.b5 = -0.7616 * s.b5 - white * 0.0168980
			arr[i] = s.b0 + s.b1 + s.b2 + s.b3 + s.b4 + s.b5 + s.b6 + white * 0.5362
			arr[i] *= 0.11
			s.b6 = white * 0.115926
		}

		return arr
	},

	brown: (arr, s) => {
		if (s.last == null) s.last = 0

		for (let i = 0, l = arr.length; i < l; i++) {
            let white = Math.random() * 2 - 1
            arr[i] = (s.last + (0.02 * white)) / 1.02
            s.last = arr[i]
            arr[i] *= 3.5
        }

        return arr
	}
}

module.exports = createNoise


function createNoise(options) {
	if (typeof options === 'string') {
		options = {color: options}
	}
	if (!options) options = {color: 'white'}

	// possible alias
	if (options.type) options.color = options.type

	// get noise type by synonym
	let generate
	switch (options.color) {
		case 'pink':
			generate = noises.pink
			break
		case 'brown':
		case 'brownian':
		case 'red':
			generate = noises.brown
			break
		case 'blue':
		case 'azure':

		case 'violet':
		case 'purple':

		case 'grey':
		case 'gray':

		case 'green':

		default:
			generate = noises.white
			break
	}

	return through((data, state) => {
		//per-channel state
		if (!state.c) {
			state.c = data.map(x => {return {}})
		}
		for (let c = 0, cnum = data.length; c < cnum; c++) {
			data[c] = generate(data[c], state.c[c])
		}
	}, options)
}
