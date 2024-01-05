import { type Command } from '../../../shared/buses/command_query'
import { createExcerciseUseCase } from './create_excercise_use_case'

async function handlerCreateExcerciseCommand(command: Command) {
	console.log(`@@@@@ command`, command)
	await createExcerciseUseCase()
}

export { handlerCreateExcerciseCommand }
