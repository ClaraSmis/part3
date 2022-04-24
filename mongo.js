const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
if(process.argv.length>5)
{
    console.log('Please provide only password, name and number as argument : node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const person_name = process.argv[3]
const number = process.argv[4]



const url =
  `mongodb+srv://ClaraS:${password}@cluster0.jdtq7.mongodb.net/phonebookapp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: person_name,
  number: number,
})

if(process.argv.length > 3)
{
    person.save().then(() => {
        console.log(`added ${person_name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
}
else 
{
    Person.find({}).then((people) => {
        console.log("phonebook:")
        people.forEach((person) => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
}
   
  