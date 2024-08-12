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
  const handleContactDeleted = async (name: string) => {
    try {
      const contactToDelete = contacts.find(
        (contact) => contact.firstName === name
      )

      if (contactToDelete) {
        setContacts(
          contacts.filter((contact) => contact.id !== contactToDelete.id)
        )
      } else {
        console.warn(`Contact with name "${name}" not found.`)
      }
    } catch (error) {
      console.error("Error deleting contact:", error)
    }
  }

  const handleContactUpdated = async (updatedContact: {
    name: string
    phoneNumber: string
  }) => {
    const contactToUpdate = contacts.find(
      (contact) => contact.firstName === updatedContact.name
    )

    if (contactToUpdate) {
      const newContact = { ...contactToUpdate, ...updatedContact }
      try {
        setContacts(
          contacts.map((contact) =>
            contact.id === contactToUpdate.id ? newContact : contact
          )
        )
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
          name={contact.firstName}
          phoneNumber={contact.phoneNumber}
          onDelete={handleContactDeleted}
          onUpdate={handleContactUpdated}
        />
      ))}
    </ul>
  )
}

export default ContactList
