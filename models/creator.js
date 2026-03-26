//decided to have models seperate from 'app.js' for better organization
import mongoose from 'mongoose'

const creatorSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: String,
  work: String,
  description: String,
  slug: {type: String, unique: true, required: true}
})
const Creator = mongoose.model('Creator', creatorSchema)

export {Creator}