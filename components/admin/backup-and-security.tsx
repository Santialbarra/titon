"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export function BackupAndSecurity() {
  const [autoBackup, setAutoBackup] = useState(false)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleBackupNow = async () => {
    try {
      // Simulated backup process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Respaldo completado",
        description: "El respaldo manual ha sido completado exitosamente.",
      })
    } catch (error) {
      toast({
        title: "Error en el respaldo",
        description: "Hubo un problema al realizar el respaldo. Por favor, intente nuevamente.",
        variant: "destructive",
      })
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      })
      return
    }

    try {
      // Here you would typically verify the current password against the stored hash
      // and update it in your database. This is a simplified example.
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Simulating password update in database
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada exitosamente.",
      })
      setPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar la contraseña. Por favor, intente nuevamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Respaldos Automáticos</h3>
          <p className="text-sm text-gray-500">Realiza respaldos diarios automáticos de tu tienda</p>
        </div>
        <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
      </div>

      <div>
        <Button onClick={handleBackupNow}>Realizar Respaldo Ahora</Button>
      </div>

      <form onSubmit={handleChangePassword} className="space-y-4">
        <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
        <div>
          <Label htmlFor="current-password">Contraseña Actual</Label>
          <Input
            id="current-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="new-password">Nueva Contraseña</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Cambiar Contraseña</Button>
      </form>
    </div>
  )
}

