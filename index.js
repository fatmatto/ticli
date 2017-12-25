'use strict'

/**
 * @class Option
 */
class Option {
  constructor (name, value) {
    this.name = name
    this.value = value || null

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
  constructor () {
    this.flags = []
    this.params = []
  }

  /**
   * Outputs the help to the stdout
   */
  printHelp () {
    console.log('\n\t Usage:\n')
    this.flags.forEach(flag => {
      console.log('\t' + [flag.name].concat(flag.aliases).join(', ') + '\t ' + flag.description)
    })
    this.params.forEach(param => {
      console.log('\t' + [param.name].concat(param.aliases).join(', ') + '\t ' + param.description)
    })
  }

  /**
   * parses process.argv and populates flags and params
   */
  parse () {
    process.argv.forEach((arg, index) => {
      this.flags.forEach(flag => {
        if (flag.name === arg || flag.aliases.indexOf(arg) > -1) {
          flag.value = true
        }
      })

      this.params.forEach(param => {
        if (param.name === arg || param.aliases.indexOf(arg) > -1) {
          let valueIndex = index + 1
          param.value = process.argv[valueIndex]
        }
      })
    })
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

    if (flag.length > 0) { return flag[0].value } else { return null }
  }
}

// Exports the Cli class
module.exports = Cli
