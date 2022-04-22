import toast from 'react-hot-toast'

const safeJsonParse = <T>(text: T): object | T => {
  try {
    if (typeof text === 'string') {
      return JSON.parse(text)
    }
    return text
  } catch (e) {
    return text
  }
}

export const warningJsonParse = <T>(text: T): object | T => {
  try {
    if (typeof text === 'string') {
      return JSON.parse(text)
    }
    return text
  } catch (e) {
    if (e instanceof Error) {
      toast.error(e.message)
    }
    return text
  }
}

export const prittierJson = (text: unknown) => {
  if (typeof text === 'string') {
    const json = safeJsonParse(text)
    if (typeof json === 'object') {
      return JSON.stringify(json, undefined, 4)
    }
    return json
  } else {
    return JSON.stringify(text, undefined, 4)
  }
}

export default safeJsonParse
