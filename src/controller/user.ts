import { Hono } from 'hono'
import { db, schema } from '../database'
import { eq } from 'drizzle-orm'

const routes = new Hono()

routes.get('/', async () => {
  const users = await db.query.users.findMany()
  return new Response(JSON.stringify(users))
})

routes.post('/', async (ctx) => {
  const body = await ctx.req.parseBody()
  const user = {
    name: body.name as string,
    email: body.email as string,
  }
  await db.insert(schema.users).values(user)
  return new Response('Created', { status: 201 })
})

routes.patch(':id', async (ctx) => {
  const userId = ctx.req.param('id')
  const { id: _, ... update } = await ctx.req.parseBody<schema.UserSchema>()

  if (Object.keys(update).length === 0) {
    return new Response('Ok');
  }

  await db
    .update(schema.users)
    .set(update)
    .where(eq(schema.users.id as any, userId))

  return new Response('Ok')
})

routes.delete(':id', async (ctx) => {
  const userId = ctx.req.param('id')

  await db.delete(schema.users).where(eq(schema.users.id as any, userId))
  return new Response('Ok')
})

export const userRoutes = routes
