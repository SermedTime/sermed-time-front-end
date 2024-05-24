export function removeEmptyEntries(
  object: Record<string, any>
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => value !== '' && (value !== null || value !== undefined)
    )
  )
}

export function convertBoolean(object: any) {
  if (object === 'true' || object === '1') {
    return true
  }

  return false
}

export function chunkArray(array: any[], arrayLength: number): any[] {
  const chunks = []
  const chunkLength = Math.max(array.length / arrayLength, 1)

  for (let i = 0; i < arrayLength; i += 1) {
    if (chunkLength * (i + 1) <= array.length) {
      chunks.push(array.slice(chunkLength * i, chunkLength * (i + 1)))
    }
  }

  return chunks
}

export function chunkArrayInGroups(array: any[], size: number): any[] {
  const result = []
  let temp = []

  for (let a = 0; a < array.length; a++) {
    temp.push(array[a])
    if (a % size === size - 1) {
      result.push(temp)
      temp = []
    }
  }

  if (temp.length > 0) result.push(temp)

  return result
}

export function convertToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to read file as Base64'))
      }
    }
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    reader.readAsDataURL(file)
  })
}
