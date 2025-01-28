import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    console.log("Received credentials:", { username, password })
    console.log("Expected credentials:", { ADMIN_USERNAME, ADMIN_PASSWORD })

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ id: "1", username: ADMIN_USERNAME, role: "admin" }, JWT_SECRET, { expiresIn: "1h" })
      console.log("Login successful, token generated")
      return NextResponse.json({ token, id: "1", username: ADMIN_USERNAME, role: "admin" })
    } else {
      console.log("Invalid credentials")
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }
  } catch (error) {
    console.error("Error en la ruta de login:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

