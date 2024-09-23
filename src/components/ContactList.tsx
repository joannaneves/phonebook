import React from "react"
import ContactItem from "./ContactItem"

interface Contact {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
}

interface ContactListProps {
  contacts: Contact[]
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
}

const ContactList: React.FC<ContactListProps> = ({ contacts, setContacts }) => {
  const handleContactDeleted = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/contacts/${id}`, {
        method: "DELETE",
      })
      setContacts(contacts.filter((contact) => contact.id !== id))
    } catch (error) {
      console.error("Error deleting contact:", error)
    }
  }

  const handleContactUpdated = async (updatedContact: Contact) => {
    const contactToUpdate = contacts.find(
      (contact) => contact.id === updatedContact.id
    )

    if (contactToUpdate) {
      try {
        const response = await fetch(
          `http://localhost:4000/contacts/${updatedContact.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          }
        )

        if (response.ok) {
          setContacts(
            contacts.map((contact) =>
              contact.id === updatedContact.id ? updatedContact : contact
            )
          )
        }
      } catch (error) {
        console.error("Error updating contact:", error)
      }
    }
  }

  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          firstName={contact.firstName}
          lastName={contact.lastName}
          phoneNumber={contact.phoneNumber}
          onDelete={handleContactDeleted}
          onUpdate={handleContactUpdated}
        />
      ))}
    </ul>
  )
}

export default ContactList
