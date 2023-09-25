import express, { Application, Request, Response } from 'express'
import { createContainer } from './backend/shared/container_factory'
import { CommandQuery } from './backend/shared/buses/command_query'

declare module 'express-serve-static-core' {
	interface Request {
		commandBus?: any
		queryBus?: any
	}
}

const app: Application = express()
const port: string | Number = process.env.PORT || 3001

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

app.use(express.json())

const { queryBus, commandBus } = createContainer()

app.use((req, res, next) => {
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
