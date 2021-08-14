// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require('https-localhost')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')

process.chdir('./dist')

const app = server()

app.serve = function(staticPath = 'dist') {
  const useBase = path.resolve(__dirname, staticPath)
  console.log(useBase)
  const p404 = path.resolve(useBase, '404.html')
  console.log(p404)
  const index = path.resolve(useBase, 'index.html')
  console.log(index)
  const hi = path.resolve(useBase, 'hi/_name.html')
  console.log(hi)
  app.use(express.static(useBase, {
    fallthrough: true,
    extensions: ['html'],
  }))
  // redirect 404 to 404.html or to index.html
  app.use((req, res) => {
    console.log(useBase)
    const requestPath = req.path.startsWith('/hi') ? hi : undefined
    console.log(`${req.path} => ${requestPath}`)
    // istanbul ignore else: not interesting
    if (requestPath && fs.existsSync(requestPath))
      res.status(200).sendFile(requestPath)
    else if (fs.existsSync(p404))
      res.status(404).sendFile(p404)
    else if (fs.existsSync(index))
      res.status(200).sendFile(index)
    else
      res.status(404).send(`${req.path} not found.`)
  })
  console.info(`Serving static path: ${staticPath}`)
  return app
}

app.redirect(80, 443)

app.serve().listen()
