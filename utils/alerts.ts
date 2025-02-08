export const codeAlert = (code: string, data?: string) => {
  switch (code) {
    case 'API_FETCH_ERROR':
      alert('There seems to be a problem with the server. Please try again later.')
      return
    case 'API_PARSE_ERROR':
      alert(`There seems to be a problem fetching data from ${data}. Please try other options.`)
      return
    case 'TRIVIA_FETCH_ERROR':
      alert('There seems to be a problem fetching trivia. Please try again later.')
      return
  }
}
