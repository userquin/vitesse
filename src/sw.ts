import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

self.skipWaiting()
clientsClaim()

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

const hiHandler = createHandlerBoundToURL('hi/:name')
const indexHandler = createHandlerBoundToURL('index.html')

registerRoute(/./, async(options) => {
  const { url } = options
  if (url.pathname && url.pathname.startsWith('/hi/'))
    return await hiHandler(options)

  return await indexHandler(options)
}, 'GET')
