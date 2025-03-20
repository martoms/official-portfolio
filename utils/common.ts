import type { MultiPartData } from 'h3'

export const commonUtils = () => {
  const decodeText = (text: string) => {
    return new DOMParser().parseFromString(text, 'text/html').body.textContent
  }

  const openLinkTo = (url: string, target: '_blank' | '_self' = '_blank') =>
    window.open(url, target)

  const getDuration = (millis: number): string => {
    const now = Date.now()
    const yrMillis = 1000 * 60 * 60 * 24 * 365
    const monMillis = 1000 * 60 * 60 * 24 * 30
    const wkMillis = 1000 * 60 * 60 * 24 * 7
    const dayMillis = 1000 * 60 * 60 * 24

    const diff = now - millis

    if (diff < dayMillis) return 'today'

    const yrs = Math.floor(diff / yrMillis)
    const mos = Math.floor((diff % yrMillis) / monMillis)
    const wks = Math.floor((diff % monMillis) / wkMillis)
    const days = Math.floor((diff % wkMillis) / dayMillis)

    if (yrs > 0) return `${yrs}yr${yrs > 1 ? 's' : ''} ${mos}mo${mos !== 1 ? 's' : ''}`
    if (mos > 0) return `${mos}mo${mos !== 1 ? 's' : ''} ${wks}wk${wks !== 1 ? 's' : ''}`
    if (wks > 0) return `${wks}wk${wks !== 1 ? 's' : ''} ${days}day${days !== 1 ? 's' : ''}`

    return 'today'
  }

  function removeUndefined<T extends Record<string, any>>(obj: T): T {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined)) as T
  }

  const toBase64 = (file: MultiPartData) => {
    return `data:${file.type};base64,${file.data.toString('base64')}`
  }

  return { decodeText, openLinkTo, getDuration, removeUndefined, toBase64 }
}
