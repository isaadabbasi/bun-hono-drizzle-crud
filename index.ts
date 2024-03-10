import { Hono } from 'hono'
import { userRoutes } from './src/controller'

const app = new Hono()

app.route('/api/users', userRoutes)

export default {
  port: 3000,
  fetch: app.fetch,
}
