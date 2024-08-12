import React from "react"

interface ContactItemProps {
  name: string
  phoneNumber: string
  onDelete: (name: string) => void
  onUpdate: (updatedContact: { name: string; phoneNumber: string }) => void
}

const ContactItem: React.FC<ContactItemProps> = ({
  name,
  phoneNumber,
  onDelete,
  onUpdate,
}) => {
  const handleUpdate = () => {
    onUpdate({ name, phoneNumber })
  }

  return (
    <div className="contact-item">
      <div>
        <strong>{name}</strong> - {phoneNumber}
      </div>
      <button onClick={() => onDelete(name)}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default ContactItem
