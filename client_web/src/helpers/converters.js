export function lookForVarName (definedVariables, researchedKeys, defaultValue, needCamelToKebabCase = true) {
  let result = ''
  let existingName = researchedKeys.find(key => key in definedVariables)

  if (existingName) {
    result = existingName
  } else {
    result = defaultValue
  }
  return needCamelToKebabCase ? camelToKebabCase(result) : result
}

export function camelToKebabCase (camelString) {
  return camelString.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() })
}
