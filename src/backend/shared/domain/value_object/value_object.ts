export abstract class ValueObject<T> {
	readonly isValueObject: boolean
	protected _value: T

	constructor(value: T) {
		this.isValueObject = true
		this._value = value
	}

	public toValue() {
		return this._value
	}
}
