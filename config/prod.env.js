'use strict'
let original = JSON.parse(process.env.npm_config_argv).original
let minimist = require('minimist')
let args = minimist(original.slice(2))
let branch = args.b || 'production'

module.exports = {
  NODE_ENV: '"production"',
  MODE_BRANCH: `"${branch}"`
}
