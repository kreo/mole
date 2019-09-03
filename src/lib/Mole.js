import config from './Config'
import theme from './Theme'
import data from './Theme'
import Output from './Output'
import peripherals from './Peripherals'
import Model from './Model'
import Template from './Template'

const outputs = config.output


class Mole {
	constructor() {

	}
	config(value) {
		config.set(value)
	}
	theme(value) {
		theme.set(value)
	}
	create(...args) {
		if (args[0] === 'model') {
			peripherals.model.push(new Model(args[1], args[2], theme, data))

		}

		if (args[0] === 'template') {
			peripherals.template.push(new Template(args[1], args[2], theme, data))
		}

		outputs.map(output => {
			// console.log(output)
			return new Output(output, peripherals, config, theme, data)
		})

	}
}

const mole = new Mole()

// console.log(config)

mole.create('model', 'redModel', ({ theme, data }) => {
	// data.color.red = 'red'
	return data
})

// console.log(config)

// console.log(outputs)

// console.log(data)

// console.log(peripherals)

// console.log(mole)

export default mole
