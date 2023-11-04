import express, { Request, Response, Express } from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'

// Database
import connectDB from './database/connect'

// dot env
import env from './types/env'
import cors from 'cors'

// router
import { authRoutes, userRoutes, productRoutes } from './routes'

// middleware
import notFoundMiddleware from './middleware/not-found'
import errorHandlerMiddleware from './middleware/error-handler'

// rest of the package
import morgan from 'morgan'

// express logic
const app: Express = express()
const port: string | number = process.env.PORT || 3001

var corsOption = {
  // origin: true, // allow CORS request from any domain
  origin: 'http://localhost:5173' as string,
  optionsSuccessStatus: 200 as number,
}
app.use(cors(corsOption))
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(env.JWT_SECRET))

app.get('/', (req: Request, res: Response) => {
  console.log(req.signedCookies)
  res.send('welcome to e-commerce-api')
})

app.use(`${env.ROUTES_URL}auth`, authRoutes)
app.use(`${env.ROUTES_URL}users`, userRoutes)
app.use(`${env.ROUTES_URL}products`, productRoutes)

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async (url: string): Promise<void> => {
  try {
    await connectDB(url)
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start(env.MONGO_URL)
