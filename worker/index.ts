type Env = any

const module: ExportedHandler<Env> = {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/hello')) {
      return new Response('Hello from the worker!')
    }

    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request)
  },
}

export default module
