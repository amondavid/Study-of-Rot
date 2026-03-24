import mongoose from 'mongoose'

const workSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: String,
  creator: String,
  description: String,
  slug: {type: String, unique: true, required: true}
})
const Work = mongoose.model('Work', workSchema)

export {Work}