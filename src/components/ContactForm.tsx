import React, { useState } from "react"
import "./ContactForm.css"

interface Contact {
  firstName: string
  lastName: string
  phoneNumber: string
}

interface ContactFormProps {
  onContactAdded: (contact: Contact) => void
  onClose: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  onContactAdded,
  onClose,
}) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContactAdded({ firstName, lastName, phoneNumber })
    setFirstName("")
    setLastName("")
    setPhoneNumber("")
    onClose()
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Add New Contact</h2>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ContactForm
