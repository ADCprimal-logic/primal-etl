const { asyncFetch, toJSON } = require('./utils')

module.exports = ({url, token}) => doc =>
  asyncFetch(`${url}/${doc.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(doc)
  })
  .chain(toJSON)
  .map(r => {
    console.log(r)
    return r
  })
