const test = require('tape')
globalThis.fetch = require('node-fetch')
const { createPipeline, extract, transform, load, report } = require('./index')

const config = {
  source: 'https://ads.tiktok.com/open_api/v1.1',
  source_token: '9d3a7ca9221bd808c0ad38558dbd0675ba27b30b',
  advertisers: ['6877921953835909121'],
  target: 'https://api.primal-etl.digital/data/di_prod',
  target_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGV2IiwiaWF0IjoxNjE1OTE1NzE4LCJleHAiOjE2NDc0NTE3MTh9.uLHBmd107ywD5Q8bxzZ6QwwQqRdICP6WQHksoXEz8QE'
}

test('success run pipeline', async t => {
  const pipeline = createPipeline(config)

  const result = await pipeline(
    extract,
    transform,
    load,
    report
  )

  //console.log(result)

  t.ok(true)
  t.end()

})

