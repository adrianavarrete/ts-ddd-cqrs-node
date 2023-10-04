import { v4 as uuidv4 } from 'uuid'
export class CommandQuery {
	protected _id: string
	protected _type: string
	protected _occurredOn: string
	protected _attributes: object
	protected _meta: object

	constructor({
		_id = uuidv4(),
		_type = '',
		_occurredOn = new Date().toISOString(),
		_attributes = {},
		_meta = {},
	}: {
		_id?: string
		_type?: string
		_occurredOn?: string
		_attributes?: object
		_meta?: object
	}) {
		this._id = _id
		this._type = _type
		this._occurredOn = _occurredOn
		this._attributes = _attributes
		this._meta = _meta
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

export class Query extends CommandQuery {
	constructor(data: object) {
		super({ ...data })
	}
}
export class Command extends CommandQuery {
	constructor(data: object) {
		super({ ...data })
	}
}
