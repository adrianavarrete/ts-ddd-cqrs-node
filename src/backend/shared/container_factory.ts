import _ from 'lodash'
import applyMiddleware from './buses/middlewares/apply_middleware'
import { SyncInMemoryHandlerBus } from './buses/buses'
import { type CommandQuery, type Command, type Query } from './buses/command_query'
import {
	type Handler,
	type ContainerCommandHandlers,
	type Container,
	type Module,
	type ContainerQueryHandlers,
	type QueryHandlers,
	type CommandHandlers,
} from './container_factory_types'
import { type Middleware } from './buses/middlewares/middleware_types'

import ExcerciseModule from '../excercise/module'

//import all BC modules with their commandHandlers and queryHandlers
const modules: Array<Module> = [ExcerciseModule]

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
				handler: (command: CommandQuery) => {
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

function createQueryBus({ handlers }: { handlers: ContainerQueryHandlers }) {
	const queryBus = new SyncInMemoryHandlerBus()

	const queryHandlers: QueryHandlers = {}

	_.forEach(handlers, (_handler, queryType) => {
		const queryHandlerMiddlewares: Array<Middleware> = [
			(next) => (query: Query) => {
				return next(query, {
					moduleName: _handler.moduleName,
					handlerName: _handler.handlerName,
					queryBus: {
						handle(_query: Query) {
							return queryBus.handle(_query)
						},
					},
				})
			},
		]

		const _queryHandler: Handler<CommandQuery> = applyMiddleware(_handler.handler, queryHandlerMiddlewares)

		queryHandlers[queryType] = _queryHandler
	})

	queryBus.setHandlers(queryHandlers)
	return queryBus
}

function createCommandBus({
	handlers,
	queryBus,
}: {
	handlers: ContainerCommandHandlers
	queryBus: SyncInMemoryHandlerBus
}) {
	const commandBus = new SyncInMemoryHandlerBus()

	const commandHandlers: CommandHandlers = {}

	_.forEach(handlers, (_handler, commandType) => {
		const commandHandlerMiddlewares: Array<Middleware> = [
			(next) => (command: Command) => {
				return next(command, {
					moduleName: _handler.moduleName,
					handlerName: _handler.handlerName,
					queryBus: {
						handle(_query: Query) {
							return queryBus.handle(_query)
						},
					},
				})
			},
		]

		const _commandHandler: Handler<CommandQuery> = applyMiddleware(
			_handler.handler,
			commandHandlerMiddlewares,
		)

		commandHandlers[commandType] = _commandHandler
	})
	commandBus.setHandlers(commandHandlers)
	return commandBus
}

export { createQueryBus, createCommandBus, createContainer }
