import React from 'react'
import { Megaphone } from 'lucide-react' // خاصك تكون مركب lucide-react

const Fix = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-800 shadow-md py-3 px-4 text-sm text-white font-semibold flex items-center justify-center gap-2 ">
      <Megaphone className="w-4 h-4 text-white animate-bounce" />
      LIVRAISON GRATUITE DANS LE MONDE ENTIER POUR LES COMMANDES DE PLUS DE 300 €
    </div>
  )
}

export default Fix
