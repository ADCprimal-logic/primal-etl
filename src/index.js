globalThis.fetch = require('node-fetch')
const { createPipeline, extract, transform, load, report } = require('./lib')


// learn more about scheduled functions here: https://arc.codes/primitives/scheduled
exports.handler = async function scheduled (event) {
  console.log(JSON.stringify(event, null, 2))

  const config = {
    source: process.env.SOURCE_URL,
    source_token: process.env.SOURCE_TOKEN,
    advertisers: process.env.ADVERTISERS.split(','),
    target: process.env.TARGET_URL,
    target_token: process.env.TARGET_TOKEN
  }

  console.log(config)

  const pipeline = createPipeline(config)

  const results = await pipeline(
    extract,
    transform,
    load,
    report
  )
  console.log(results)

  console.log('done')
}
