const getReports = require('./get-reports')
const putStats = require('./put-stats.js')


const { assoc, compose, concat, map } = require('ramda')
const pipeK = require('crocks/helpers/pipeK')
const Async = require('crocks/Async')
const ReaderT = require('crocks/Reader/ReaderT')
const AsyncReader = ReaderT(Async)
const { ask, lift } = AsyncReader
const { all } = Async

/**
 * creates a functional Async pipeline
 */
exports.createPipeline = env => (...fns) =>
  pipeK(...fns)(AsyncReader.of())
    .runWith(env)
    .toPromise()

exports.extract = () => ask(({source, advertisers, source_token}) => {
  return all(
    map(getReports({url: source, token: source_token}) , advertisers)
  ).map(r => r)
}).chain(lift)

const createId = doc => 
  assoc('id', `tiktok:${doc.advertiserId}-${new Date().toISOString()}`,doc)

exports.transform = (data) => AsyncReader.of(
  map(
    compose( 
      assoc('type', 'tiktok'),
      createId
    ),
    data
  )
)


exports.load = data => ask(({target, target_token}) => 
  all(
    map(putStats({url: target, token: target_token}), data)
  )
).chain(lift)


exports.report = results => {
  console.log(`Imported ${results.length} on ${new Date().toISOString()} for tiktok`)
  return AsyncReader.of(results.length)
}
