import express, { Application, Request, Response } from 'express'

const app: Application = express()
const port: string | Number = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

app.use(express.json())

// app.use to handle command, query and event

app.get('/', (req: Request, res: Response) => {
	res.send('Hello! I am developed with TS')
})
