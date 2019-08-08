import dataModel from './data-model'

// export class Model {
// 	constructor(name, callback) {
// 		this.name = name
// 		// This updates mole.model with changes from plugin
// 		Object.assign(mole.model, Object.getPrototypeOf(callback(mole.model)))
// 		// console.log(mole.model)
// 	}
// }

export default class Plugin {
	constructor(name, pluginFunction, type) {
		pluginFunction()(dataModel)
		this.name = name
		this.model = dataModel
		this.type = type
		// this.func = Object.assign(
		// 	dataModel,
		// 	Object.getPrototypeOf(pluginFunction()(dataModel))
		// )
	}
}

// export default dataModel
