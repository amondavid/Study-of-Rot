//I decided to have this seperate, because the codecookies tutorial suggested that's best practice.
import mongoose from 'mongoose'

//'async' signifies that this function takes time, 'await' means 'only continue once mongoose.connect is done' 
const connectDB = async () => { 
  await mongoose.connect('mongodb://127.0.0.1:27017/studyOfRot')
  .then(() => console.log('Database connected'))
  .catch(error => console.error('MongoDB connection error:', err))
}

export {connectDB}
