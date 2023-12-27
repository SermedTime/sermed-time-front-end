import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

import { fakeRequest } from '@/services/api/sermed-api/sermed-api'

interface ModalContextData {
  amount: number
}

const Context = createContext<ModalContextData>({} as ModalContextData)

interface Props {
  children: ReactNode
}

function ModalContext({ children }: Props) {
  const [amount, setAmount] = useState(0)

  async function callback() {
    await fakeRequest(100)

    const openedModals = document.getElementsByClassName('custom-modal').length

    openedModals > 0
      ? document.body.classList.add('no-overflow')
      : document.body.classList.remove('no-overflow')

    setAmount(openedModals)
  }

  const targetNode = document.getElementById('modal') as HTMLElement

  const config = { attributes: true, childList: true, subtree: true }

  const observer = new MutationObserver(callback)

  observer.observe(targetNode, config)

  const providerValue = useMemo(() => ({ amount }), [amount])

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

function useModalContext(): ModalContextData {
  return useContext(Context)
}

export { ModalContext, useModalContext }
