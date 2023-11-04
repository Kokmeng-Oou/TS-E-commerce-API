import dotenv from 'dotenv'
dotenv.config()

type Env = {
  PORT: number | string
  MONGO_URL: string
  JWT_SECRET: string
  EXPIRES_IN: string
  ROUTES_URL: string
}

const env = process.env as Env

export default env
