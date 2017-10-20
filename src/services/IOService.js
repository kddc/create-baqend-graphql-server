import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

class IOService {
  async readFile(filename, encoding = 'utf8') {
    return new Promise((res, rej) => fs.readFile(filename, encoding, (err, data) => err ? rej(err) : res(data)));
  }

  async writeFile(data, filename, encoding = 'utf8') {
    return new Promise((res, rej) => fs.writeFile(filename, data, { encoding }, (err) => err ? rej(err) : res()));
  }

  async fileExists(filename) {
    return new Promise((res, rej) => fs.exists(filename, (exists) => res(exists)));
  }

  async mkDir(directory) {
    return new Promise((res, rej) => mkdirp(directory, (err) => err ? rej(err) : res()));
  }
}

export default new IOService()
