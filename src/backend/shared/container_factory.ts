/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

import { SyncInMemoryHandlerBus } from './buses/buses'

module.exports = { createQueryBus, createCommandBus }

function createQueryBus() {
	const queryBus = new SyncInMemoryHandlerBus()

	const queryHandlers = { testType: () => {} }

	queryBus.setHandlers(queryHandlers)
	return queryBus
}

function createCommandBus() {
	const commandBus = new SyncInMemoryHandlerBus()

	const commandHandlers = { testType: () => {} }

	commandBus.setHandlers(commandHandlers)
	return commandBus
}
