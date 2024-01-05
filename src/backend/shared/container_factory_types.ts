import { type Query, type Command } from './buses/command_query'

export type Handler<T> = (commandOrQuery: T, dependencies?: object) => Promise<void>

export type Module = {
	id: string
	name: string
	commandHandlers: Record<string, Handler<Command>>
	queryHandlers: Record<string, Handler<Query>>
}

export type ContainerCommandHandlers = Record<
	string,
	{
		moduleName: string
		handlerName: string
		handler: Handler<Command>
	}
>

export type ContainerQueryHandlers = Record<
	string,
	{
		moduleName: string
		handlerName: string
		handler: Handler<Query>
	}
>

export type Container = {
	commandHandlers: ContainerCommandHandlers
	queryHandlers: ContainerQueryHandlers
}
