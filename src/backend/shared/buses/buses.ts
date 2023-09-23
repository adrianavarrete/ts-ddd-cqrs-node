// SyncInMemoryCommandBus, SyncInMemoryQueryBus

import { CommandQuery } from './command_query'

export class SyncInMemoryHandlerBus {
	protected _handlers: Record<string, (commandOrQuery: CommandQuery) => void>

	constructor() {
		this._handlers = {}
	}

	setHandlers(handlers: Record<string, (commandOrQuery: CommandQuery) => void>) {
		this._handlers = handlers
	}

	async handle(commandOrQuery: CommandQuery) {
		let handler = this._handlers[commandOrQuery.getType()]

		if (handler) {
			return handler(commandOrQuery)
		} else {
			throw new Error('No handler found for the given command or query.')
		}
	}
}
