import _ from 'lodash'
import { ValueObject } from './value_object'

function idError({ value, message = 'this is an error' }: { value: string; message?: string }) {
	return new Error(`${message} --> value: ${value}`)
}

export class Id extends ValueObject<string> {
	constructor(value: string) {
		if (!_.isString(value)) {
			throw idError({ value })
		}
		super(value)
	}
}
