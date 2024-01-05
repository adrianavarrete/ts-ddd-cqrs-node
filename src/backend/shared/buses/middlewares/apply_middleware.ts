/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

import { type Handler } from '../../container_factory_types'
import { type Query, type Command } from '../action'
import { type Middleware } from './middleware_types'

function applyMiddleware(fn: Handler<Command | Query>, middlewares: Array<Middleware>) {
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
