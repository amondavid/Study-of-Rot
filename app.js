import express from 'express'
import {connectDB} from './config/database.js'
import {Work} from './models/work.js'
import {Creator} from './models/creator.js'

// import {logger} from './middlewares/logger.js'


const app = express()
const PORT = 5000 // changed port to distinquish it from the 3000 one used in the tutorial 

connectDB()

/*const workList = [
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
*/

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

/* app.use(logger) */

app.use(express.static('public')) 

// main page
app.get('/', (request, response) => {
  response.render('index')
})

//works list
app.get('/works', async (request, response) => {
  try {
    const works = await Work.find({}).exec()
    response.render('works/index', {workList: works})
  } catch (error) {
    console.error(error)
    response.status(500).send('Error: could not retrieve works.')
  }
  
})

//form: create new work entry
app.get('/works/new', (request, response) => {
  response.render('works/new')
})

app.post('/works', async (request, response) => {
  try {
    const work = new Work({
      name: request.body.name,
      date: request.body.date,  
      creator: request.body.creator,
      description: request.body.description,
      slug: request.body.slug 
    })
    await work.save()

    response.send('Work entry created')
  } catch (error) {
    console.error(error)
    response.send('Error: The work entry could not be created')
  }
})

// individual work
app.get('/works/:slug', async (request, response) => {
  try {
    const work = await Work.findOne({slug: request.params.slug}).exec()
    if (work) {
      response.render('works/show', {foundWork: work})
    } else {
      response.status(404).render('error')
    }
  } catch (error) {
    console.error(error)
    response.status(500).send('Error: Could not retrieve work entry.')
  }
})

//form: edit work entry
app.get('/works/:slug/edit', async (request, response) => {
  try {
    const slug =  request.params.slug
    const work = await Work.findOne({slug: slug}).exec()
    if (!work) throw new Error('Work entry not found')

    response.render('works/edit', {foundWork: work})
  }catch(error) {
    console.error(error)
    response.status(404).send('Could not find the work entry you\'re looking for.')
}
    })

    
app.post('/works/:slug', async (request, response) => {
  try {
    const work = await Work.findOneAndUpdate(
      {slug: request.params.slug},
      request.body,
      {new: true}
    )

    response.redirect(`/works/${work.slug}`)
  }catch (error) {
    console.error(error)
    response.send('Error: The work entry could not be created.')
  }
})


//delete work entry: just add '/delete' at the end of the relevant slug
app.get('/works/:slug/delete', async (request, response) => {
  try {
    await Work.findOneAndDelete({slug: request.params.slug})

    response.redirect('/works')
  }catch (error) {
    console.error()
    response.send('Error: No work entry was deleted.')
  }
})


//creator list
app.get('/creators', async (request, response) => {
  try {
    const creators = await Creator.find({}).exec()
    response.render('creators/index', {creatorList: creators})
  } catch (error) {
    console.error(error)
    response.status(500).send('Error: could not retrieve creators.')
  }
  
})

//form: create new creator entry
app.get('/creators/new', (request, response) => {
  response.render('creators/new')
})

app.post('/creators', async (request, response) => {
  try {
    const creator = new Creator({
      name: request.body.name,
      date: request.body.date,  
      work: request.body.work,
      description: request.body.description,
      slug: request.body.slug 
    })
    await creator.save()

    response.send('Creator entry created')
  } catch (error) {
    console.error(error)
    response.send('Error: The creator entry could not be created')
  }
})

//indiviudual creator page
app.get('/creators/:slug', async (request, response) => {
  try {
    const creator = await Creator.findOne({slug: request.params.slug}).exec()
    if (creator) {
      response.render('creators/show', {foundCreator: creator})
    } else {
      response.status(404).render('error')
    }
  } catch (error) {
    console.error(error)
    response.status(500).send('Error: Could not retrieve creator entry.')
  }
})

//form: edit creator entry
app.get('/creators/:slug/edit', async (request, response) => {
  try {
    const slug =  request.params.slug
    const creator = await Creator.findOne({slug: slug}).exec()
    if (!creator) throw new Error('Creator entry not found')

    response.render('creators/edit', {foundCreator: creator})
  }catch(error) {
    console.error(error)
    response.status(404).send('Could not find the creator entry you\'re looking for.')
}
    })


app.post('/creators/:slug', async (request, response) => {
  try {
    const creator = await Creator.findOneAndUpdate(
      {slug: request.params.slug},
      request.body,
      {new: true}
    )

    response.redirect(`/creators/${creator.slug}`)
  }catch (error) {
    console.error(error)
    response.send('Error: The creator entry could not be created.')
  }
})

//delete creator entry: just add '/delete' at the end of the relevant slug
app.get('/creators/:slug/delete', async (request, response) => {
  try {
    await Creator.findOneAndDelete({slug: request.params.slug})

    response.redirect('/creators')
  }catch (error) {
    console.error()
    response.send('Error: No creator entry was deleted.')
  }
})

app.get('/illustrations', (request, response) => {
  response.render('illustrations')
})

app.get('/about', (request, response) => {  
  response.render('about')
})


app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`)
})