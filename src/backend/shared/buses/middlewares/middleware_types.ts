import { type Handler } from '../../container_factory_types'
import { type CommandQuery } from '../command_query'

export type Middleware = (fn: Handler<CommandQuery>) => Handler<CommandQuery>
