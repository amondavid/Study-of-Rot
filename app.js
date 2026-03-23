import express from 'express'
import { logger } from './middlewares/logger.js'

const app = express()
const PORT = 5000 /* changed port to distinquish it from the 3000 one used in the tutorial */

const workList = [
  {
    name: "No Longer Human",
    date: "1948",
    creator: "Dazai Osamu",
    description: "Classic post-war Japanese novel about a life full of shame.",
    slug: "no-longer-human"
  },
  {
    name: "Goodnight Punpun",
    date: "2007-2013",
    creator: "Asano Inio",
    description: "Coming of age Seinen Manga depicting the troubled life of Onodera Punpun.",
    slug: "goodnight-punpun"
  }
]

const creatorList = [
  {
    name: "Dazai Osamu",
    date: "19 June 1909 – 13 June 1948",
    work: "No Longer Human, The Setting Sun",
    description: "Japanese novelist who took his life at 38. 'No Longer Human' is said to be based on his own story.",
    slug: "dazai-osamu"
  },
  {
    name: "Asano Inio",
    date: "born 22 September 1980",
    work: "Goodnight Punpun, Solanin, Dead Dead Demon's Dededede Destruction",
    description: "A japanese manga artist known for his character-driven, realist stories.",
    slug: "asano-inio"
  }
]


app.set('view engine', 'ejs')


/* app.use(logger) */

/* app.use(express.static('public')) */

app.get('/', (request, response) => {
  response.render('index')
})

app.get('/works', (request, response) => {
  response.render('works/index')
})

app.get('/works/:slug', (request, response) => {
  const urlSlug = request.params.slug
  const foundWork = workList.find(work => work.slug === urlSlug)

  if (foundWork) {
    response.render('works/show', {foundWork: foundWork} )}
  else {
    response.status(404).render('error')
  }
})

app.get('/creators', (request, response) => {
  response.render('creators/index')
})

app.get('/creators/:slug', (request, response) => {
  const urlSlug = request.params.slug
  const foundCreator = creatorList.find(creator => creator.slug === urlSlug)

  if (foundCreator) {
    response.render('creators/show', {foundCreator: foundCreator} )}
  else {
    response.status(404).render('error')
  }
})

app.get('/illustrations', (request, response) => {
  response.render('illustrations')
})

app.get('/about', (request, response) => {  /* still static, to be changed later */
  response.render('about')
})


app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`)
})