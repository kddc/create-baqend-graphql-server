import fs from 'fs'
import path from 'path'

const flatten = (inputArray) => {
  let arr
  arr = inputArray
    .reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
    .filter(n => n)
  arr = [...new Set(arr)]
  return arr
}

const readFile = (filename, encoding = 'utf8') => {
  return fs.readFileSync(path.join(process.cwd(), filename), encoding)
}
const writeFile = (filename, data, encoding = 'utf8') => {
  return fs.writeFileSync(path.join(process.cwd(), filename), data, { encoding })
}

const fileExists = (filename) => {
  return fs.existsSync(path.join(process.cwd(), filename))
}

const mkDir = (directory) => {
  return fs.mkdirSync(path.join(process.cwd(), directory))
}

const extractImports = (input) => {
  let imports = null
  const importMatches = input.match(/^import.*\n?$/gm, '')
  if (importMatches && importMatches.length) {
    const absoluteImportMatches = importMatches.filter((importMatch) => {
      return importMatch.match(/^import.*'(?!\.).*'.*\n?$/gm)
    })
    imports = `${absoluteImportMatches.join('\n')}`.trim()
    importMatches.forEach((importMatch) => {
      input = input.replace(importMatch, '')
    })
  }
  return [
    input.trim(),
    imports,
  ]
}

const deleteExports = (input) => {
  return input.replace(/^export.*\n?$/gm, '').trim()
}

const extractDefinitions = (input) => {
  let parsed = null
  const matches = input.match(/(?:let|const|var).*(resolvers|typedefs)\s?=\s?((?:{|`)(?:\s|.)*(?:}|`))/mi, '')
  if (matches && matches.length) {
    parsed = {}
    input = input.replace(matches[0], '')
    if (matches[1].match(/resolver/i)) {
      parsed.type = 'resolvers'
    } else if (matches[1].match(/type/i)) {
      parsed.type = 'typeDefs'
    }
    parsed['definitions'] = matches[2]
  }
  return [
    input.trim(),
    parsed,
  ]
}

const processDefinitions = (input) => {
  input = extractImports(input)
  const imports = input[1]
  const parsedInput = extractDefinitions(deleteExports(input[0]))
  return {
    importDefinitions: imports,
    definitions: parsedInput[0],
    graphqlDefinitions: parsedInput[1],
  }
}

export {
  flatten,
  readFile,
  writeFile,
  fileExists,
  mkDir,
  extractImports,
  deleteExports,
  extractDefinitions,
  processDefinitions,
}
