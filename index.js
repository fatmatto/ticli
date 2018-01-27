'use strict'

/**
 *
 * @param {Number} n How many spaces to add to the padding string
 * @returns {String} padding Returns the padding string
 */
function getPadding (n) {
  let b = '  '
  for (var i = 0; i < n; i++) {
    b += ' '
  }
  return b
}

class Command {
  constructor (name, callback) {
    this.name = name
    this.callback = callback

    this.description = 'A useful command'
    this.aliases = []
  }

  /**
   *
   * @param {String} aliasName Assign an alias to the option, like "--help" and "-h" for the "help" option
   */
  alias (aliasName) {
    this.aliases.push(aliasName)
    return this
  }

  /**
   *
   * @param {String} desc The Param or Flag description, useful for printing the help
   */
  describe (desc) {
    this.description = desc
    return this
  }

  setDefault () {
    this.isDefault = true
  }
}

/**
 * @class Option
 */
class Option {
  constructor (name, value) {
    this.name = name
    this.value = value

    this.description = 'A useful parameter or flag'
    this.aliases = []
  }

  /**
   *
   * @param {String} aliasName Assign an alias to the option, like "--help" and "-h" for the "help" option
   */
  alias (aliasName) {
    this.aliases.push(aliasName)
    return this
  }

  /**
   *
   * @param {String} desc The Param or Flag description, useful for printing the help
   */
  describe (desc) {
    this.description = desc
    return this
  }
}

/**
 * @class Cli
 */
class Cli {
  constructor (title) {
    this.title = title || ''
    this.flags = []
    this.params = []
    this.commands = []

    this.parseWasCalled = false
  }

  /**
   * Outputs the help to the stdout
   */
  printHelp () {
    if (this.title) {
      console.log('\n ' + this.title + '\n')
    }
    console.log('\n\tUsage:\n')
    let firstColumn = []
    let secondColumn = []
    this.flags.forEach(flag => {
      firstColumn.push([flag.name].concat(flag.aliases).join(', '))
      secondColumn.push(flag.description)
    })
    this.params.forEach(param => {
      firstColumn.push([param.name].concat(param.aliases).join(', ') + ` <${param.name}>`)
      secondColumn.push(param.description)
    })

    // Now we look for the longest element in first column
    let maxLength = firstColumn.slice(0).sort(function (a, b) { return b.length - a.length })[0].length

    for (var i = 0; i < firstColumn.length; i++) {
      let padding = getPadding(maxLength - firstColumn[i].length)
      console.log('\t' + firstColumn[i] + padding + secondColumn[i])
    }
  }

  /**
   * parses process.argv and populates flags and params
   * @param {Array} args Optional array of cli arguments. Defaults to process.argv
   */
  parse (args) {
    args = args || process.argv

    if (!Array.isArray(args)) { throw new Error('args must be an array of strings') }

    args.forEach((arg, index) => {
      this.flags.forEach(flag => {
        if (flag.name === arg || flag.aliases.indexOf(arg) > -1) {
          flag.value = true
        }
      })

      this.params.forEach(param => {
        if (param.name === arg || param.aliases.indexOf(arg) > -1) {
          let valueIndex = index + 1
          param.value = args[valueIndex]
        }
      })

      this.commands.forEach(command => {
        if (command.name === arg || command.aliases.indexOf(arg) > -1) {
          command.hasBeenCalled = true
        }
      })
    })

    this.parseWasCalled = true
  }
  /**
   * Call this method to invoke commands matching command line arguments.
   * If matching commands are found, their callback will be called.
   * If parse() was not explicitly called before,
   * this method will call parse() without arguments. See the parse method for more information.
   */
  run () {
    if (this.parseWasCalled === false) { this.parse() }

    let calledCommands = this.commands
      .filter(command => command.hasBeenCalled)

    // Still multiple defaults can be called
    if (calledCommands.length === 0) { calledCommands = this.commands.filter(command => command.isDefault) }

    calledCommands
      .forEach(command => command.callback.call(this, this))
  }

  /**
   *
   * @param {String} flagName the name of the flag. If present will be populated with true value
   * @param {*} defaultValue The default value for this flag
   */
  registerFlag (flagName, defaultValue) {
    if (typeof defaultValue === 'undefined') { defaultValue = false }
    let newFlag = new Option(flagName, defaultValue)
    this.flags.push(newFlag)
    return newFlag
  }

  /**
   *
   * @param {String} paramName The parameter name
   * @param {Mixed} defaultValue The default parameter value if the value is not provided
   */
  registerParam (paramName, defaultValue) {
    if (typeof defaultValue === 'undefined') { defaultValue = null }
    let newParam = new Option(paramName, defaultValue)
    this.params.push(newParam)
    return newParam
  }

  /**
   * Registers a function to be executed when the script is launched with a specific commandName e.g. node script.js help
   *
   * @param  {[type]}   commandName [description]
   * @param  {Function} callback    [description]
   * @return {[type]}               [description]
   */
  registerCommand (commandName, callback) {
    if (typeof callback !== 'function') { throw new Error('callback must be a function') }

    if (typeof commandName !== 'string') { throw new Error('commandName must be a string') }

    let newCommand = new Command(commandName, callback)
    this.commands.push(newCommand)
    return newCommand
  }

  /**
   * @return {Object} a map of all parsed params and flags
   */
  get () {
    let o = {}

    this.flags.forEach(flag => {
      o[flag.name] = flag.value
    })

    this.params.forEach(param => {
      o[param.name] = param.value
    })

    return o
  }

  /**
   *
   * @param {String} paramName  the name of the parameter to return
   */
  getParam (paramName) {
    let param = this.params.filter(param => {
      return param.name === paramName
    })

    if (param.length > 0) { return param[0].value } else { return null }
  }

  /**
   *
   * @param {String} flagName the name of the flag to return
   */
  getFlag (flagName) {
    let flag = this.flags.filter(flag => {
      return flag.name === flagName
    })

    if (flag.length > 0) { return flag[0].value } else { return false }
  }
}

// Exports the Cli class
module.exports = Cli
