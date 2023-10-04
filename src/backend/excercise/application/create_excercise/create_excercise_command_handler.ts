import { createExcerciseUseCase } from './create_excercise_use_case'
import { type CreateExcersiceCommand } from './create_excersice_command'

async function handlerCreateExcerciseCommand(command: CreateExcersiceCommand) {
	console.log(`@@@@@ command`, command)
	await createExcerciseUseCase()
}

export { handlerCreateExcerciseCommand }
