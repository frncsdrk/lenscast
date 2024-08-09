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
  return [
    'gif', 'GIF',
    'jpg', 'jpeg', 'JPG', 'JPEG',
    'png', 'PNG',
  ].includes(getFileExtension(filename));
};

const isVideo = (filename) => {
  return [
    'mp4', 'MP4',
    'webm', 'WEBM',
  ].includes(getFileExtension(filename));
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
        .sort()
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
        .filter(file => isImage(file.name) || isVideo(file.name)) // Check if file format is supported
        .map(file => {
          return {
            name: file.name,
            extension: getFileExtension(file.name),
            // path: path + '/' + file.name,
            isImage: isImage(file.name),
            isVideo: isVideo(file.name),
          }
        })
        .sort((a, b) => {
          // Ignore case
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        })
    );
  });
};

module.exports = {
  getRootDirectory,
  isImage,
  isVideo,
  listDirectories,
  listFiles,
};
