'use strct'

/**
 * Try runnning this example as
 *
 * node examples/basic.js -u http://google.com -m GET
 *
 * or
 *
 * node examples/basic.js help
 *
 *
 */
const Cli = require('../index')

let c = new Cli("Basic Example v0.1")

c.registerFlag('help')
  .alias('-h')
  .alias('--help')
  .describe('Print help')

c.registerParam('url')
  .alias('-u')
  .alias('--url')
  .describe('The HTTP url to call')

c.registerParam('method')
  .alias('-m')
  .alias('--method')
  .describe('The HTTP method to use')

c.parse()

if (c.getFlag('help') === true) {
  console.log('Printing help and exiting\n')
  c.printHelp()
  process.exit(0)
}

console.log('Parsed params', c.get())
