// SyncInMemoryCommandBus, SyncInMemoryQueryBus

import { type CommandHandlers, type QueryHandlers } from '../container_factory_types'
import { type CommandQuery } from './command_query'

export class SyncInMemoryHandlerBus {
	protected _handlers: QueryHandlers | CommandHandlers

	constructor() {
		this._handlers = {}
	}

	setHandlers(handlers: QueryHandlers) {
		this._handlers = handlers
	}

	async handle(commandOrQuery: CommandQuery) {
		const handler = this._handlers[commandOrQuery.getType()]

		if (handler) {
			return handler(commandOrQuery)
		} else {
			throw new Error('No handler found for the given command or query.')
		}
	}
}
