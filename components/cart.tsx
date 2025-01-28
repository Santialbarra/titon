"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store-context"

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, removeFromCart, updateQuantity, total } = useCart()
  const { contactInfo } = useStore()

  const handleCheckout = () => {
    const message = encodeURIComponent(`Hola! Me gustaría hacer un pedido:
${cart.map((item) => `- ${item.name} (${item.size}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join("\n")}

Total: $${total.toFixed(2)}`)

    // Asegúrate de que el número de WhatsApp esté en el formato correcto
    const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, "")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="relative p-2 text-gray-400 hover:text-gray-500">
        <ShoppingCart className="h-6 w-6" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {cart.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 max-w-full flex z-50"
          >
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Carrito de compras</h2>
                    <button onClick={() => setIsOpen(false)} className="ml-3 h-7 flex items-center justify-center">
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${item.price.toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.size}</p>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                                    -
                                  </button>
                                  <p className="mx-2 text-gray-500 dark:text-gray-400">Cantidad {item.quantity}</p>
                                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    Envío y impuestos calculados al finalizar la compra.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={handleCheckout}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Finalizar compra por WhatsApp
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500 dark:text-gray-400">
                    <p>
                      o{" "}
                      <button
                        type="button"
                        className="text-indigo-600 font-medium hover:text-indigo-500"
                        onClick={() => setIsOpen(false)}
                      >
                        Continuar comprando<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

