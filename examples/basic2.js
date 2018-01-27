const Cli = require('../index')

let program = new Cli()

program.registerParam('foo', 'defaultValue')
  .alias('-f')
  .alias('--foo')
  .describe('The parameter you need to do your thing')

program.registerParam('bar', 1)
  .alias('-b')
  .alias('--bar')
  .describe('The parameter you need to do your thing')

program.registerFlag('secure')
  .alias('-s')
  .alias('--secure')
  .describe('The program will be secure')

// It is very common to set the help command as default
program
  .registerCommand('help', (program) => { program.printHelp() })
  .setDefault()

program.registerCommand('echoParams', (program) => { console.log(program.get()) })

// Optional if run() is called
program.parse()

program.run()
