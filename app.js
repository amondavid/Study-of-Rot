import express from 'express'
import { logger } from './middlewares/logger.js'

const app = express()
const PORT = 5000 /* changed port to distinquish it from the 3000 one used in the tutorial */



/* app.use(logger) */

app.use(express.static('public')) 

app.get('/', (request, response) => {
  response.sendFile('index.html', { root: 'public' }) /*sendFile allows me to route directly to an html file*/
})

app.get('/works', (request, response) => {
  response.send('works page')
})

app.get('/works/:slug', (request, response) => {
  const workId = request.params.slug
response.send('works slug page')
})

app.get('/creators', (request, response) => {
  response.send('creators page')
})

app.get('/creators/:slug', (request, response) => {
  const creatorId = request.params.slug
response.send('creators slug page')
})

app.get('/illustrations', (request, response) => {
  response.send('illustrations page')
})

app.get('/about', (request, response) => {  /* still static, to be changed later */
  response.sendFile('about.html', { root: 'public' })
})


app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`)
})