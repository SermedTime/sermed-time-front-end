'use-client'

import { useState, useEffect } from 'react'

export function useZoomDetection() {
  const [zoomLevel, setzoomLevel] = useState(1)

  useEffect(() => {
    const handleZoomChange = () => {
      const zoomLevel = window.devicePixelRatio
      setzoomLevel(zoomLevel)
    }

    window.addEventListener('resize', handleZoomChange)

    // Execute a função de tratamento inicialmente para obter o zoom atual
    handleZoomChange()

    // Remova o ouvinte de evento ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleZoomChange)
    }
  }, [])

  return { zoomLevel }
}
