const { readFile } = require('fs')
const { promisify } = require('util')

const asyncReadFile = promisify(readFile)

const READ_OPTIONS = { encoding: 'utf8'}
const FILE_URL = 'E:/Documents/Code/Wab/CV/index.html'

module.exports = async () => {

    const pageContent = await asyncReadFile(FILE_URL, READ_OPTIONS);

    return pageContent

}