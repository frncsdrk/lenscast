const fs = require('fs');
const config = require('config');

const getRootDirectory = () => {
  let dir = config.get('service.server.root_directory').replace('$whoami', process.env.USER);
  if (dir.charAt(dir.length - 1) !== '/') dir += '/';

  return dir;
};

const getFileExtension = (filename) => {
  return filename.split('.').at(-1);
};

const isImage = (filename) => {
  // TODO: Add svg support
  return ['png', 'jpg', 'jpeg', 'gif'].includes(getFileExtension(filename));
};

const isVideo = (filename) => {
  return ['mp4', 'webm'].includes(getFileExtension(filename));
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
        .map(file => {
          return {
            name: file.name,
            extension: getFileExtension(file.name),
            // path: path + '/' + file.name,
            image: isImage(file.name),
            video: isVideo(file.name),
          }
        })
    );
  });
};

module.exports = {
  getRootDirectory,
  listDirectories,
  listFiles,
};
