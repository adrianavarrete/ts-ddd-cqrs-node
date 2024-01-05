import { type Handler } from '../../container_factory_types'
import { type Query, type Command } from '../action'

export type Middleware = (fn: Handler<Command | Query>) => Handler<Command | Query>
