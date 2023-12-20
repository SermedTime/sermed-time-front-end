import CryptoJS from 'crypto-js'

export function getSessionStorageItem(key: string): any {
  const storaged = sessionStorage.getItem(key)

  if (storaged) {
    const bytes = CryptoJS.AES.decrypt(storaged, 'Sermed@time')
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    return data
  }

  return ''
}

export function setSessionStorageItem(
  key: string,
  value: Record<string, any> | any[] | number | string | boolean
): void {
  const encrypt = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    'Sermed@time'
  ).toString()

  sessionStorage.setItem(key, encrypt)
}

export function removeSessionStorageItem(key: string): void {
  sessionStorage.removeItem(key)
}
