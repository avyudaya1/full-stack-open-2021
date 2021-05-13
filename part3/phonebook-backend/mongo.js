const mongoose = require('mongoose')

//error handling
if(process.argv.length< 3){
  console.log('Please provide password as an argument')
}

if(process.argv.length !== 3 && process.argv.length < 5){
  console.log('The correct way of making new phone book entry: node mongo.js <password> <newName> <newNumber>')
}

//mongoose connect
const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@cluster0.8j8as.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true})

// person model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date
})

const Person = mongoose.model('Person', personSchema)


//actual work
if(process.argv.length == 3) {
  display()
} else {
  makeEntry()
}

function display() {
    
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

function makeEntry() {
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  const person = new Person({
    name: newName,
    number: newNumber,
    date: new Date()
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}