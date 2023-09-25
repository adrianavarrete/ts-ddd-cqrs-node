import _ from 'lodash'
/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

import { SyncInMemoryHandlerBus } from './buses/buses'
import { CommandQuery } from './buses/command_query'

type Module = {
	id: string
	name: string
	commandHandlers: Record<string, (command: CommandQuery) => Promise<void>>
	queryHandlers: Record<string, (query: CommandQuery) => Promise<void>>
}

export type CommandHandlers = Record<
	string,
	{
		moduleName: string
		handlerName: string
		handler: (command: CommandQuery) => Promise<void>
	}
>

export type QueryHandlers = Record<
	string,
	{
		moduleName: string
		handlerName: string
		handler: (query: CommandQuery) => Promise<void>
	}
>

type Container = {
	commandHandlers: CommandHandlers
	queryHandlers: QueryHandlers
}

//import all BC modules with their commandHandlers and queryHandlers
const modules: Module[] = []

function createContainer() {
	const container: Container = {
		commandHandlers: {},
		queryHandlers: {},
	}

	_.forEach(modules, (module: Module) => {
		//Commands

		_.forEach(module.commandHandlers, (commandHandler, commandType) => {
			container.commandHandlers[commandType] = {
				moduleName: module.name,
				handlerName: commandHandler.name,
				handler: async (command: CommandQuery) => {
					return commandHandler(command)
				},
			}
		})

		_.forEach(module.queryHandlers, (queryHandler, queryType) => {
			container.queryHandlers[queryType] = {
				moduleName: module.name,
				handlerName: queryHandler.name,
				handler: async (query: CommandQuery) => {
					return queryHandler(query)
				},
			}
		})
	})

	const queryBus = createQueryBus({ handlers: container.queryHandlers })

	const commandBus = createCommandBus({
		handlers: container.commandHandlers,
		queryBus,
	})

	return {
		queryBus,
		commandBus,
	}
}

function createQueryBus({ handlers }: { handlers: QueryHandlers }) {
	const queryBus = new SyncInMemoryHandlerBus()

	const queryHandlers: QueryHandlers = handlers

	// TODO: Middlewares to all queryHandlers

	queryBus.setHandlers(queryHandlers)
	return queryBus
}

function createCommandBus({
	handlers,
	queryBus,
}: {
	handlers: CommandHandlers
	queryBus: SyncInMemoryHandlerBus
}) {
	const commandBus = new SyncInMemoryHandlerBus()

	const commandHandlers = handlers

	// TODO: Inject QueryBus and middlewares to all commandHandlers

	commandBus.setHandlers(commandHandlers)
	return commandBus
}

module.exports = { createQueryBus, createCommandBus, createContainer }
