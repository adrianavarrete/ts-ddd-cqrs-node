import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import { createContainer } from './backend/shared/container_factory'
import { type Query, type Command } from './backend/shared/buses/command_query'
import { CreateExcersiceCommand } from './backend/excercise/application/create_excercise/create_excersice_command'

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		export interface Request {
			commandBus: { handle: (command: Command) => Promise<void> }
			queryBus: { handle: (query: Query) => Promise<void> }
		}
	}
}

const app: Application = express()
const port: string | number = process.env.PORT || 3001

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

app.use(express.json())

const { queryBus, commandBus } = createContainer()

app.use((req: Request, res: Response, next: NextFunction) => {
	req.commandBus = {
		handle: (command: Command) => commandBus.handle(command),
	}
	req.queryBus = {
		handle: (query: Query) => queryBus.handle(query),
	}

	return next()
})

app.get('/', async (req: Request, res: Response) => {
	await req.commandBus.handle(CreateExcersiceCommand.create())
	res.send('Hello! I am developed with TS')
})
