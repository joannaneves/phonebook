import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import { Pool } from "pg"

const app = express()
const port = 4000

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(bodyParser.json())

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "23782378",
  port: 5432,
})

// GET all contacts
app.get("/contacts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts")
    res.json(result.rows)
  } catch (error) {
    res.status(500).send("Error fetching contacts")
  }
})

// GET a single contact by ID
app.get("/contacts/:id", async (req, res) => {
  const contactId = parseInt(req.params.id)
  try {
    const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [
      contactId,
    ])
    if (result.rows.length > 0) {
      res.json(result.rows[0])
    } else {
      res.status(404).send("Contact not found")
    }
  } catch (error) {
    res.status(500).send("Error fetching contact")
  }
})

// CREATE a new contact
app.post("/contacts", async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body
  try {
    const result = await pool.query(
      "INSERT INTO contacts (first_name, last_name, phone_number) VALUES ($1, $2, $3) RETURNING *",
      [firstName, lastName, phoneNumber]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).send("Error adding contact")
  }
})

// UPDATE a contact
app.put("/contacts/:id", async (req, res) => {
  const contactId = parseInt(req.params.id)
  const { firstName, lastName, phoneNumber } = req.body
  try {
    const result = await pool.query(
      "UPDATE contacts SET first_name = $1, last_name = $2, phone_number = $3 WHERE id = $4 RETURNING *",
      [firstName, lastName, phoneNumber, contactId]
    )
    if (result.rows.length > 0) {
      res.json(result.rows[0])
    } else {
      res.status(404).send("Contact not found")
    }
  } catch (error) {
    res.status(500).send("Error updating contact")
  }
})

// DELETE a contact
app.delete("/contacts/:id", async (req, res) => {
  const contactId = parseInt(req.params.id)
  try {
    const result = await pool.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING *",
      [contactId]
    )
    if (result.rows.length > 0) {
      res.status(204).send()
    } else {
      res.status(404).send("Contact not found")
    }
  } catch (error) {
    res.status(500).send("Error deleting contact")
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
