/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

import { type Handler } from '../../container_factory_types'
import { type CommandQuery } from '../command_query'
import { type Middleware } from './middleware_types'

function applyMiddleware(fn: Handler<CommandQuery>, middlewares: Array<Middleware>) {
	let fnWithMiddleware = fn
	middlewares
		.slice()
		.reverse()
		.forEach((middleware) => {
			fnWithMiddleware = middleware(fnWithMiddleware)
		})
	return fnWithMiddleware
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

export = applyMiddleware
