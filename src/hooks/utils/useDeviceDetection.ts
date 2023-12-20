'use client'

import { useState, useEffect } from 'react'

import { useMediaQuery } from 'react-responsive'

const NOTEBOOK_DEVICE = { minWidth: 992, maxWidth: 1400 }
const DESKTOP_DEVICE = { minWidth: 1400 }

export function useDeviceDetection() {
  const notebook = useMediaQuery(NOTEBOOK_DEVICE)
  const desktop = useMediaQuery(DESKTOP_DEVICE)

  const [isNotebook, setIsNotebook] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsNotebook(notebook)
  }, [notebook])

  useEffect(() => {
    setIsDesktop(desktop)
  }, [desktop])

  return { isNotebook, isDesktop }
}
