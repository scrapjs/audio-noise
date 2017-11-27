# audio-noise [![Build Status](https://travis-ci.org/audiojs/audio-noise.svg?branch=master)](https://travis-ci.org/audiojs/audio-noise) [![experimental](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges)

Fill array or audio-buffer with defined type of noise.

[![$ npm install audio-noise](http://nodei.co/npm/audio-noise.png?mini=true)](http://npmjs.org/package/audio-noise)

```js
let createNoise = require('audio-noise')

let noise = createNoise('pink')

//create array filled with pink noise
let arr = noise(Array(1024))
```

### `createNoise(color|options)`

Create noise generator based off color of noise or options.

#### `options`

Property | Default | Meaning
---|---|---
`type`, `color` | `'white'` | Color of noise.
`sampleRate`, `rate` | `44100` | Output data sample rate.
`channels`, `numberOfChannels` | `1` | Output data number of channels.
`length`, `frameSize`, `samplesPerFrame` | `1024` | Default length of the block.
`format`, `dtype` | `'float32'` | Output data format, eg. `'uint8 interleaved'`, `'float32 planar'`, `'array'`, `'audiobuffer'` etc. See [pcm-convert](https://github.com/audiojs/pcm-convert) and [audio-format](https://github.com/audiojs/audio-format) for list of available formats.
`alias` | `{}` | Dict of param aliases to read from options, eg. `{frequency: 'freq f frequency'}`

#### `color` or `options.color`

Value | Spectrum | Description
---|---|---
'white' | | Flat spectrum noise. See [wiki](https://en.wikipedia.org/wiki/White_noise).
'pink' | | -3dB/octave. See [wiki](https://en.wikipedia.org/wiki/Pink_noise).
'brown' | | -6dB/octave. See [wiki](https://en.wikipedia.org/wiki/Brownian_noise).
'blue' | | +3dB/octave.
'violet' | | +6dB/octave.
'grey' | | White noise weighted by loudness curve, see [a-weighting](https://github.com/audiojs/a-weighting). Also see [wiki](https://en.wikipedia.org/wiki/Grey_noise)
'green'` | |

### `noise(target|length?)`

Fill passed audio-buffer or array with noise. Buffer is modified in-place.

```js
const write = require('web-audio-write')()
const noise = require('./')({color: 'white', format: 'stereo audiobuffer'})

;(function tick(err) {
	if (err) throw err
	write(noise(), tick)
})()
```


## Related

* [pull-audio-noise](https://github.com/audiojs/pull-audio-noise) − audio-noise pull-stream source
* [audio-noise-stream](https://github.com/audiojs/audio-noise-stream) − audio-noise readable node stream

## See also

* [Colors of Noise](https://en.wikipedia.org/wiki/Colors_of_noise) − digest of colors of noise.
* [white-noise-node](https://github.com/mohayonao/white-noise-node), [pink-noise-node](https://github.com/mohayonao/pink-noise-node), [brown-noise-node](https://github.com/mohayonao/brown-noise-node) − Web Audio API noise source nodes.

## License

(c) 2017 Dmitry Yvanov. MIT License
