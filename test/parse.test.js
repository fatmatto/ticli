require('should')

let Program = require('../index')

describe('#parse()', () => {
  it('Should parse the correct value for the parameter', () => {
    let program = new Program('Ticli Parse Test')

    program.registerParam('url')
      .alias('-u')
      .alias('--url')
      .describe('The HTTP url to call')

    program.parse(['node', 'parse.test.js', '--url', 'https://github.com'])
    program.getParam('url').should.equal('https://github.com')
  })

  it('Should assign the correct default value to param', () => {
    let program = new Program('Ticli Parse Test')

    program.registerParam('method', 'GET')
      .alias('-m')
      .alias('--method')
      .describe('The HTTP method')

    program.parse(['node', 'parse.test.js'])
    program.getParam('method').should.equal('GET')
  })

  it('Should parse the correct value for flags', () => {
    let program = new Program('Ticli Parse Test')

    program.registerFlag('https')
      .alias('-https')
      .alias('--use-https')
      .describe('Enable HTTPS')

    program.registerFlag('json')
      .alias('-j')
      .alias('--json')
      .describe('Accept JSON')

    program.parse(['node', 'parse.test.js', '-https'])

    program.getFlag('https').should.equal(true)
    program.getFlag('json').should.equal(false)
  })
})
