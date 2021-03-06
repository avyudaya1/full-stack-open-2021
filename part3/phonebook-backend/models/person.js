const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// person model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

