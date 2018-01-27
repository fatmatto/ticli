'use strct'

/**
 * Try runnning this example as
 *
 * node examples/basic.js  printParams --url www.google.it --method POST
 *
 * or
 *
 * node examples/basic.js help
 *
 *
 */
const Cli = require('../index')

let program = new Cli('Basic Example without commands or flags or parameters v0.1')

// The parse step is mandatory as it collects parameters from the prcocess.argv array
program.parse()

program.printHelp()
