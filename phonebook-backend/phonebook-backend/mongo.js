const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> [name] [number]')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4] || ''

const url = 'mongodb+srv://harivardhanmodi:1eKlo7UjnUtkv41x@cluster0.yah0fp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // 👉 Just show all entries
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
} else {
  // 👉 Add a new entry
  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(
      `added ${name} ${number ? `number ${number}` : 'without number'} to phonebook`
    )
    mongoose.connection.close()
  })
}
