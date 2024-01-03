import express, { type Request, type Response, type NextFunction } from 'express'
import { createContainer } from './backend/shared/container_factory'
import { type Query, type Command } from './backend/shared/buses/command_query'
import { CreateExcerciseCommand } from './backend/excercise'

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		export interface Request {
			commandBus: { handle: (command: Command) => Promise<void> }
			queryBus: { handle: (query: Query) => Promise<void> }
		}
	}
}

const app = express()
const port = process.env.PORT || 3001

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

const router = express.Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	req.commandBus
		.handle(CreateExcerciseCommand.create())
		.then(() => {
			res.send('Hello! I am developed with TS')
		})
		.catch(next)
})

app.use('/api', router)
