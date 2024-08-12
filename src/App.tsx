import React, { useState } from "react"
import ContactForm from "./components/ContactForm"

interface Contact {
  name: string
  phone: string
}

const contactsData: Contact[] = [
  { name: "Eric Elliot", phone: "222-555-6575" },
  { name: "Steve Jobs", phone: "220-454-6754" },
  { name: "Fred Allen", phone: "210-657-9886" },
  { name: "Steve Wozniak", phone: "343-675-8786" },
  { name: "Bill Gates", phone: "343-654-9688" },
]

const App: React.FC = () => {
  const [contacts, setContacts] = useState(contactsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleDeleteContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact])
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Phone Book App</h1>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search for contact by last name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button
          className="add-contact-button"
          onClick={() => setIsAdding(true)}
        >
          Add Contact
        </button>
      </div>
      <ul className="contact-list">
        {filteredContacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <div className="contact-info">
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteContact(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isAdding && (
        <ContactForm
          onContactAdded={handleAddContact}
          onClose={() => setIsAdding(false)}
        />
      )}
    </div>
  )
}

export default App
