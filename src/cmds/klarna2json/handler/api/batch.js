const got = require('./got')

module.exports = async ({ token, api: { url }, params }) => {
  if (!params.limit) {
    delete params.limit
  }

  const responses = []
  let paginationToken = 0,
    curCount = 0,
    countCollected = 0,
    totalCount = 0
  do {
    const { body } = await got(url, {
      responseType: 'json',
      context: {
        token,
      },
      searchParams: {
        ...params,
        paginationToken,
      },
    })
    paginationToken = body.paginationToken
    curCount = body.transactions.length
    totalCount = body.totalCount
    countCollected += curCount
    if (curCount) {
      responses.push(body)
    }
    console.log(
      'Loaded %s out of %s total. Next token: %s',
      countCollected,
      body.totalCount,
      paginationToken,
    )
  } while (countCollected < totalCount && curCount !== 0 && paginationToken !== null)

  return responses
}
