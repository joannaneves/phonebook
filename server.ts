import bodyParser from "body-parser"
import express from "express"

const app = express()
const port = 3001

// Mock database
let contacts: {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
}[] = [
  { id: 1, firstName: "Eric", lastName: "Elliot", phoneNumber: "222-555-6575" },
  { id: 2, firstName: "Steve", lastName: "Jobs", phoneNumber: "220-454-6754" },
  { id: 3, firstName: "Fred", lastName: "Allen", phoneNumber: "210-657-9886" },
  {
    id: 4,
    firstName: "Steve",
    lastName: "Wozniak",
    phoneNumber: "343-675-8786",
  },
  { id: 5, firstName: "Bill", lastName: "Gates", phoneNumber: "343-654-9688" },
]

app.use(bodyParser.json())

// GET all contacts
app.get("/contacts", (req, res) => {
  res.json(contacts)
})

// GET a single contact
app.get("/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id)
  const contact = contacts.find((c) => c.id === contactId)

  if (contact) {
    res.json(contact)
  } else {
    res.status(404).send("Contact not found")
  }
})

// CREATE a new contact
app.post("/contacts", (req, res) => {
  const newContact = req.body
  newContact.id = contacts.length + 1
  contacts.push(newContact)
  res.status(201).json(newContact)
})

// UPDATE a contact
app.put("/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id)
  const updatedContact = req.body
  const contactIndex = contacts.findIndex((c) => c.id === contactId)

  if (contactIndex !== -1) {
    contacts[contactIndex] = updatedContact
    res.json(updatedContact)
  } else {
    res.status(404).send("Contact not found")
  }
})

// DELETE a contact
app.delete("/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id)
  const contactIndex = contacts.findIndex((c) => c.id === contactId)

  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1)
    res.status(204).send()
  } else {
    res.status(404).send("Contact not found")
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
