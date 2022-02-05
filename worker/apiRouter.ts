import { Router } from 'worktop'
import type { Context } from './types'

export const apiRouter = new Router<Context>()

apiRouter.add('GET', '/hello', () => new Response('GET /api/hello'))
