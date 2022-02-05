import { Router } from 'worktop'
import { start } from 'worktop/cfw'

import type { Context } from './types'
import { apiRouter } from './apiRouter'

const mainRouter = new Router<Context>()

mainRouter.mount('/api/', apiRouter)

mainRouter.add('GET', '*', (req, context) => {
  // Fetch static assets like .html and .js files in the dist folder
  return context.bindings.ASSETS.fetch(req)
})

export default start(mainRouter.run)
