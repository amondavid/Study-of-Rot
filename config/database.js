import mongoose from 'mongoose'

const connectDB = async () => { /*'async' signifies that this function takes time, 'await' means 'only continue once mongoose.connect is done' */
  await mongoose.connect('mongodb://127.0.0.1:27017/studyOfRot')
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error))
}

export {connectDB}
