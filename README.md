[![Build Status](https://travis-ci.org/fatmatto/ticli.svg?branch=master)](https://travis-ci.org/fatmatto/ticli)

# Ticli (TIny CLI)
Zero dependencies, very tiny, nodejs command line argument parser.

## Installation

```bash
npm i @fatmatto/ticli
```

## Basic usage

```javascript
const Cli = require('../index')

let program = new Cli()

program.registerFlag('help')
  .alias('-h')
  .alias('--help')
  .describe('Print help')

program.registerParam('thing')
  .alias('-t')
  .alias('--thing')
  .describe('The parameter you need to do your thing')

program.registerCommand('help', (program) => { program.printHelp()})
program.registerCommand('echoParams', (program) => { console.log( program.get() ) })

// Optional if run() is called
program.parse()

program.run()


```
