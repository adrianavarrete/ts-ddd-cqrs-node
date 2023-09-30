import { type CommandQuery } from './buses/command_query'

export type Handler<T> = (commandOrQuery: T, dependencies?: object) => Promise<void>

export type Module = {
	id: string
	name: string
	commandHandlers: Record<string, Handler<CommandQuery>>
	queryHandlers: Record<string, Handler<CommandQuery>>
}

export type ContainerCommandHandlers = Record<
	string,
	{
		moduleName: string
		handlerName: string
		handler: Handler<CommandQuery>
	}
>

export type ContainerQueryHandlers = Record<
	string,
	{
		moduleName: string
		handlerName: string
		handler: Handler<CommandQuery>
	}
>

export type Container = {
	commandHandlers: ContainerCommandHandlers
	queryHandlers: ContainerQueryHandlers
}

export type QueryHandlers = Record<string, Handler<CommandQuery>>
export type CommandHandlers = Record<string, Handler<CommandQuery>>
