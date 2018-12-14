export default {
  baseUrl: () => {
    if (process.env.NODE_ENV === 'develop') {
      return 'http://localhost:8080/'
    }
    return 'https://gcp-expenses.appspot.com/'
  }
}
