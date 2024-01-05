// SyncInMemoryCommandBus, SyncInMemoryQueryBus

import { type Handler } from '../container_factory_types'
import { Command, Query } from './action'

export type QueryHandlers = Record<string, Handler<Query>>
export type CommandHandlers = Record<string, Handler<Command>>

export class SyncInMemoryHandlerBus {
	protected _handlers: QueryHandlers | CommandHandlers

	constructor() {
		this._handlers = {}
	}

	setHandlers(handlers: CommandHandlers | QueryHandlers) {
		this._handlers = handlers
	}

	async handle(commandOrQuery: Command | Query) {
		const handler = this._handlers[commandOrQuery.getType()]

		if (handler) {
			return handler(commandOrQuery)
		}
		if (!handler && commandOrQuery instanceof Command) {
			throw new Error('No handler found for the given command.')
		}
		if (!handler && commandOrQuery instanceof Query) {
			throw new Error('No handler found for the given query.')
		}
	}
}
