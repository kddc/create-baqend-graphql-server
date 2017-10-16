import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

class IOServiceSync {
  readFile(filename, encoding = 'utf8') {
    return fs.readFileSync(path.join(process.cwd(), filename), encoding)
  }

  writeFile(filename, data, encoding = 'utf8') {
    return fs.writeFileSync(path.join(process.cwd(), filename), data, { encoding })
  }

  fileExists(filename) {
    return fs.existsSync(path.join(process.cwd(), filename))
  }

  copyFile(src, dest) {
    this.writeFile(dest, this.readFile(src))
  }

  mkDir(directory) {
    return mkdirp.sync(path.join(process.cwd(), directory))
  }
}

export default new IOServiceSync()
