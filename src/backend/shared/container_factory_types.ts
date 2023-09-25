import { CommandQuery } from './buses/command_query'

export type Module = {
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

export type Container = {
	commandHandlers: CommandHandlers
	queryHandlers: QueryHandlers
}
