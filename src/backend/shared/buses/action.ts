import { v4 as uuidv4 } from 'uuid'

const TYPES = {
	COMMAND: 'command',
	QUERY: 'query',
	EVENT: 'event',
} as const

export type ActionType = 'command' | 'event' | 'query'

export class Action {
	protected __type: ActionType
	protected _id: string
	protected _type: string
	protected _occurredOn: string
	protected _attributes: object
	protected _meta: object

	constructor({
		_id = uuidv4(),
		_type = '',
		__type,
		_occurredOn = new Date().toISOString(),
		_attributes = {},
		_meta = {},
	}: {
		__type: ActionType
		_id?: string
		_type?: string
		_occurredOn?: string
		_attributes?: object
		_meta?: object
	}) {
		this.__type = __type
		this._id = _id
		this._type = _type
		this._occurredOn = _occurredOn
		this._attributes = _attributes
		this._meta = _meta
	}

	//Methods

	isCommand() {
		return this.__type === TYPES.COMMAND
	}

	isQuery() {
		return this.__type === TYPES.QUERY
	}

	isEvent() {
		return this.__type === TYPES.EVENT
	}

	// Getters
	// -------

	getId() {
		return this._id
	}

	getType() {
		return this._type
	}

	getOccurredOn() {
		return this._occurredOn
	}

	getAttributes() {
		return this._attributes
	}

	getMetadata() {
		return this._meta
	}
}

export class Query extends Action {
	constructor(data: object) {
		super({ ...data, __type: TYPES.QUERY })
	}
}
export class Command extends Action {
	constructor(data: object) {
		super({ ...data, __type: TYPES.COMMAND })
	}
}

export class Event extends Action {
	constructor(data: object) {
		super({ ...data, __type: TYPES.EVENT })
	}
}
