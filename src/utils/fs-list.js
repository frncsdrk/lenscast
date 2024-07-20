const fs = require('fs');
const config = require('config');

const getRootDirectory = () => {
  // TODO: Add trailing `/`, if necessary
  return config.get('service.server.root_directory').replace('$whoami', process.env.USER);
};

const listDirectories = (path, cb) => {
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }

    cb(
      files
        .filter(dirent => dirent.isDirectory())
        .map(dir => dir.name)
    );
  });
};

const listFiles = (path, cb) => {
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }

    cb(
      files
        .filter(dirent => !dirent.isDirectory())
        .map(dir => dir.name)
    );
  });
};

module.exports = {
  getRootDirectory,
  listDirectories,
  listFiles,
};
