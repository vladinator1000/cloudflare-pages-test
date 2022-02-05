import type { Durable } from 'worktop/cfw.durable'

export type Context = import('worktop').Context & {
  bindings: {
    ASSETS: Durable.Object
  }
}
