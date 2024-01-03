import { createExcerciseUseCase } from './create_excercise_use_case'
import { type CreateExcerciseCommand } from './create_excersice_command'

async function handlerCreateExcerciseCommand(command: CreateExcerciseCommand) {
	console.log(`@@@@@ command`, command)
	await createExcerciseUseCase()
}

export { handlerCreateExcerciseCommand }
