import mole from './lib/mole'
import { Mole } from './lib/mole'
const env = nunjucks.configure()
import nunjucks from 'nunjucks'

// mole.add(
// 	new Mole.Model('model-name', model => {
// 		return (model.color.red = 'value')
// 	})
// )

mole.model('model-name', model => {
	return (model.color.red = 'value')
})

console.log(mole)

export default mole
