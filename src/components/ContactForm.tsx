import React, { useState } from "react"
import "./ContactForm.css"

interface Contact {
  name: string
  phone: string
}

interface ContactFormProps {
  onContactAdded: (contact: Contact) => void
  onClose: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  onContactAdded,
  onClose,
}) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContactAdded({ name, phone })
    setName("")
    setPhone("")
    onClose()
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Add New Contact</h2>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
