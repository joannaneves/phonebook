import React, { useEffect, useState } from "react"
import ContactForm from "./components/ContactForm"

interface Contact {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
}

// O tipo sem ID (para ser usado antes do contato ser salvo no backend)
interface NewContact {
  firstName: string
  lastName: string
  phoneNumber: string
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  // Função para carregar os contatos do backend
  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:4000/contacts")
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error("Error fetching contacts:", error)
    }
  }

  // Carregar contatos na montagem do componente
  useEffect(() => {
    fetchContacts()
  }, [])

  // Função para adicionar um novo contato
  const handleAddContact = async (newContact: NewContact) => {
    try {
      const response = await fetch("http://localhost:4000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      })
      const createdContact = await response.json()
      setContacts([...contacts, createdContact]) // Agora o contato vem com um 'id' gerado pelo backend
      setIsAdding(false) // Fechar o formulário de adição
    } catch (error) {
      console.error("Error adding contact:", error)
    }
  }

  // Função para deletar um contato
  const handleDeleteContact = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/contacts/${id}`, {
        method: "DELETE",
      })
      setContacts(contacts.filter((contact) => contact.id !== id))
    } catch (error) {
      console.error("Error deleting contact:", error)
    }
  }

  // Filtrar contatos com base no termo de busca
  const filteredContacts = contacts.filter((contact) =>
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

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
          + Add Contact
        </button>
      </div>
      <ul className="contact-list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <div className="contact-info">
              <h3>
                {contact.firstName} {contact.lastName}
              </h3>
              <p>{contact.phoneNumber}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteContact(contact.id)}
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
