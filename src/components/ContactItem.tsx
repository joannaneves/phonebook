import React, { useState } from "react"

interface ContactItemProps {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  onDelete: (id: number) => void
  onUpdate: (updatedContact: {
    id: number
    firstName: string
    lastName: string
    phoneNumber: string
  }) => void
}

const ContactItem: React.FC<ContactItemProps> = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber)

  const handleUpdate = () => {
    onUpdate({
      id,
      firstName: newFirstName,
      lastName: newLastName,
      phoneNumber: newPhoneNumber,
    })
    setIsEditing(false)
  }

  return (
    <div className="contact-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <strong>
            {firstName} {lastName}
          </strong>{" "}
          - {phoneNumber}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default ContactItem
