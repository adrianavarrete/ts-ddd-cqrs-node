import { type Module } from '../shared/container_factory_types'
import { handlerCreateExcerciseCommand } from './application/create_excercise/create_excercise_command_handler'
import { CreateExcersiceCommand } from './application/create_excercise/create_excersice_command'

const ExcerciseModule: Module = {
	id: '7385d121-3d57-45fe-a79c-244a994dbf63',
	name: 'excercise',
	commandHandlers: {
		[CreateExcersiceCommand.type]: handlerCreateExcerciseCommand,
	},
	queryHandlers: {},
}

export default ExcerciseModule
