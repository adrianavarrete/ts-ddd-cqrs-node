const uuid = require('uuid')

export class CommandQuery {
	protected _type: string
	protected _id: string
	protected _occurredOn: string
	protected _attributes: {}
	protected _meta: {}

	constructor({
		_type,
		_id = uuid.v4(),
		_occurredOn = new Date().toISOString(),
		_attributes = {},
		_meta = {},
	}: {
		_type: string
		_id?: string
		_occurredOn?: string
		_attributes?: {}
		_meta?: {}
	}) {
		this._type = _type
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
