"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export function SocialMediaIntegration() {
  const [facebookConnected, setFacebookConnected] = useState(false)
  const [instagramConnected, setInstagramConnected] = useState(false)
  const [twitterConnected, setTwitterConnected] = useState(false)
  const [autoPost, setAutoPost] = useState(false)

  const handleConnect = (platform: string) => {
    // Simulated connection process
    toast({
      title: "Conexión exitosa",
      description: `Tu cuenta de ${platform} ha sido conectada.`,
    })
    switch (platform) {
      case "Facebook":
        setFacebookConnected(true)
        break
      case "Instagram":
        setInstagramConnected(true)
        break
      case "Twitter":
        setTwitterConnected(true)
        break
    }
  }

  const handleDisconnect = (platform: string) => {
    // Simulated disconnection process
    toast({
      title: "Desconexión exitosa",
      description: `Tu cuenta de ${platform} ha sido desconectada.`,
    })
    switch (platform) {
      case "Facebook":
        setFacebookConnected(false)
        break
      case "Instagram":
        setInstagramConnected(false)
        break
      case "Twitter":
        setTwitterConnected(false)
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Facebook</h3>
          <p className="text-sm text-gray-500">Conecta tu página de Facebook</p>
        </div>
        {facebookConnected ? (
          <Button onClick={() => handleDisconnect("Facebook")} variant="outline">
            Desconectar
          </Button>
        ) : (
          <Button onClick={() => handleConnect("Facebook")}>Conectar</Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Instagram</h3>
          <p className="text-sm text-gray-500">Conecta tu cuenta de Instagram</p>
        </div>
        {instagramConnected ? (
          <Button onClick={() => handleDisconnect("Instagram")} variant="outline">
            Desconectar
          </Button>
        ) : (
          <Button onClick={() => handleConnect("Instagram")}>Conectar</Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Twitter</h3>
          <p className="text-sm text-gray-500">Conecta tu cuenta de Twitter</p>
        </div>
        {twitterConnected ? (
          <Button onClick={() => handleDisconnect("Twitter")} variant="outline">
            Desconectar
          </Button>
        ) : (
          <Button onClick={() => handleConnect("Twitter")}>Conectar</Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="auto-post" checked={autoPost} onCheckedChange={setAutoPost} />
        <Label htmlFor="auto-post">Publicar automáticamente nuevos productos en redes sociales</Label>
      </div>
    </div>
  )
}

