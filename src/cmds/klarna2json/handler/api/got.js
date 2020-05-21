const Got = require('got')

module.exports = Got.extend({
  options: {
    retry: 0,
    responseType: 'json',
  },
  hooks: {
    beforeRequest: [
      (options) => {
        if (!options.context.token) {
          throw new Error('Token is required')
        }

        options.headers.Authorization = `Bearer ${options.context.token.trim()}`
        delete options.headers['User-Agent']
      },
    ],
    beforeError: [
      (error) => {
        const { response } = error

        if (response && response.body) {
          console.error(response.body)
        }

        return error
      },
    ],
  },
})
