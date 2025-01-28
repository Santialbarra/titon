import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Acceso No Autorizado</h1>
      <p className="text-xl mb-8">Lo sentimos, no tienes permiso para acceder a esta página.</p>
      <Link href="/">
        <Button>Volver a la página principal</Button>
      </Link>
    </div>
  )
}

