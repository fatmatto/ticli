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

let c = new Cli()

c.registerFlag('help')
  .alias('-h')
  .alias('--help')
  .describe('Print help')

c.registerParam('thing')
  .alias('-t')
  .alias('--thing')
  .describe('The parameter you need to do your thing')

c.parse()

if (c.getFlag('help') === true) {
  console.log('Printing help and exiting\n')
  c.printHelp()
  process.exit(0)
}

console.log('Parsed params', c.get())
```
