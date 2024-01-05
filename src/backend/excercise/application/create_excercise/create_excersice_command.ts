import { Command } from '../../../shared/buses/action'

export class CreateExcerciseCommand extends Command {
	static get type() {
		return 'excercise.1.command.create_exercise'
	}

	static create() {
		return new this({
			_type: this.type,
			_attributes: {},
			_meta: {},
		})
	}
}
