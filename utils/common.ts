export const common = () => {
  const decodeText = (text: string) => {
    return new DOMParser().parseFromString(text, 'text/html').body.textContent
  }

  return { decodeText }
}
