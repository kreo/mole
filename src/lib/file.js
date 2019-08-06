import fs from 'fs-extra'
import is from '../util/is'
import glob from 'glob'

import nunjucks from 'nunjucks'

let cwd = process.cwd()

// var env = new nunjucks.Environment()
const env = nunjucks.configure()

export default class File {
	constructor(output, plugins, model) {
		this.content = this.getContent(output, plugins, model)
		this.path = output.path
	}

	getContentFromDirs(dir, output) {
		let result = []

		// If has subdirectory that matches named output eg "templates/ios/"
		if (fs.existsSync(cwd + '/' + dir + output.name + '/')) {
			console.log('has matching directories')
			// Get files that match model eg "templates/ios/class.njk" or "templates/ios/index.njk"
			let files = glob.sync(
				cwd + '/' + dir + output.name + '/@(class*|index*)'
			)

			for (let file of files) {
				// console.log(fs.readFileSync(file, 'utf8'))
				result.push(fs.readFileSync(file, 'utf8'))
			}
		} else {
			// If main directory has file that matches named output eg "templates/ios.njk"
			// TODO: Could possibly also check if filename matches model eg. "ios.class.njk"
			let files = glob.sync(cwd + '/' + dir + output.name + '*')

			for (let file of files) {
				// console.log(fs.readFileSync(file, 'utf8'))
				result.push(fs.readFileSync(file, 'utf8'))
			}
		}

		return result.join('\n')
	}

	getContent(output, plugins, model) {
		// Need to check if templates is an array or not
		// console.log(output)
		if (is.arr(output.template)) {
			for (let template of output.template) {
				switch (is.what(template)[0]) {
					case 'dir':
						console.log('value is a dir')
						// eg "templates/"
						return env.renderString(
							fs.readFileSync(
								this.getContentFromDirs(template, output),
								'utf8'
							),
							model
						)
					case 'file':
						return env.renderString(
							fs.readFileSync(cwd + '/' + template, 'utf8'),
							model
						)
					case 'string':
						for (let plugin of plugins) {
							if (template === plugin.name) {
								// eg "plugin-name"
								console.log('value is a named plugin')
								return plugin.rendered
							}
						}
						break
					default:
					// do something
				}
			}
		} else {
			// If not an array then put into array and process again
			output.template = [output.template]
			return this.getContent(output, plugins, model)
		}
	}
}
