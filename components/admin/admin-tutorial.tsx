"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function AdminTutorial() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Vista General</AccordionTrigger>
        <AccordionContent>
          La Vista General te proporciona un resumen rápido de las estadísticas clave de tu tienda, incluyendo ventas
          totales, productos vendidos, productos con bajo stock y nuevos clientes.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Gestión de Productos</AccordionTrigger>
        <AccordionContent>
          En la sección de Productos, puedes agregar nuevos productos a tu tienda. Asegúrate de proporcionar toda la
          información necesaria, incluyendo nombre, precio, descripción, tallas disponibles y stock.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Gestión de Categorías</AccordionTrigger>
        <AccordionContent>
          La sección de Categorías te permite organizar tus productos. Puedes crear nuevas categorías y subcategorías
          para mantener tu tienda ordenada y fácil de navegar.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>Cuentas del Negocio</AccordionTrigger>
        <AccordionContent>
          Aquí puedes gestionar las finanzas de tu negocio, registrando ingresos y gastos para mantener un seguimiento
          de tu balance.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>Información de Contacto</AccordionTrigger>
        <AccordionContent>
          Mantén actualizada la información de contacto de tu tienda, incluyendo WhatsApp, Instagram y correo
          electrónico.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>Personalización de Estilo</AccordionTrigger>
        <AccordionContent>
          Personaliza la apariencia de tu tienda cambiando el nombre, logo, banner, colores y tema. Estos cambios se
          reflejarán en la página principal de tu tienda.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>Integración con Redes Sociales</AccordionTrigger>
        <AccordionContent>
          Conecta tus cuentas de redes sociales para compartir automáticamente nuevos productos y promociones. Puedes
          vincular Facebook, Instagram y Twitter.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger>Seguridad y Respaldos</AccordionTrigger>
        <AccordionContent>
          Configura respaldos automáticos de tu tienda y activa la autenticación de dos factores para mayor seguridad.
          También puedes realizar respaldos manuales cuando lo necesites.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

