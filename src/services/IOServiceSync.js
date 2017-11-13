import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

class IOServiceSync {
  mkPath(pathname) {
    if (pathname.startsWith("./")) {
      return path.join(__dirname, '../..', pathname)
    } else {
      return path.join(process.cwd(), pathname)
    }
  }

  readFile(filename, encoding = 'utf8') {
    return fs.readFileSync(this.mkPath(filename), encoding)
  }

  writeFile(filename, data, encoding = 'utf8') {
    return fs.writeFileSync(this.mkPath(filename), data, { encoding })
  }

  fileExists(filename) {
    return fs.existsSync(this.mkPath(filename))
  }

  copyFile(src, dest) {
    this.writeFile(dest, this.readFile(src))
  }

  mkDir(directory) {
    return mkdirp.sync(this.mkPath(directory))
  }
}

export default new IOServiceSync()
