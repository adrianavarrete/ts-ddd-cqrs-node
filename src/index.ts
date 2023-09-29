import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import { createContainer } from './backend/shared/container_factory'
import { type CommandQuery } from './backend/shared/buses/command_query'

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		export interface Request {
			commandBus?: object
			queryBus?: object
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
		handle: (command: CommandQuery) => commandBus.handle(command),
	}
	req.queryBus = {
		handle: (query: CommandQuery) => queryBus.handle(query),
	}

	return next()
})

app.get('/', (req: Request, res: Response) => {
	res.send('Hello! I am developed with TS')
})
