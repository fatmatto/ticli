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

let program = new Cli('Basic Example v0.1')

program
  .registerCommand('help', (program) => {
    program.printHelp()
  })
  .setDefault()

program
  .registerCommand('printParams', (program) => {
    console.log('Parsed params', program.get())
  })

program
  .registerParam('myParam')
  .alias('-p')
  .alias('--param')
  .describe('My parameter')

// The parse step is mandatory as it collects parameters from the prcocess.argv array
program.parse()

program.run()
