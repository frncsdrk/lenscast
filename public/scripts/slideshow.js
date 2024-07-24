var filePath;
var fileList;
var currentFileIdx = 0;
var config;

addEventListener('load', function() {
  console.log('Hello, slideshow!');

  filePath = document.querySelector('#slideshow-path').innerText;
  fileList = JSON.parse(document.querySelector('#slideshow-files').innerText);
  config = JSON.parse(document.querySelector('#slideshow-config').innerText);

  console.log('files:', fileList);

  configure();
  addControls();
  showFile(currentFileIdx);
});

function getImgDisplay() {
  // var imgDisplay = document.querySelector('#img-display');

  return {
    container: document.querySelector('#img-display'),
    img: document.querySelector('#img-display img'),
  };
}

function getVidDisplay() {
  // var imgDisplay = document.querySelector('#img-display');

  return {
    container: document.querySelector('#vid-display'),
    video: document.querySelector('#vid-display video'),
    source: document.querySelector('#vid-display video source'),
  };
}

function configure() {
  if (config.video.autoplay) {
    getVidDisplay().video.autoplay = true;
  }
}

function showFile(idx) {
  var file = fileList[idx];

  if (file.isImage) {
    getVidDisplay().container.classList.add('hidden');
    getImgDisplay().container.classList.remove('hidden');
    getImgDisplay().img.src = `/api/image?path=${filePath}/${file.name}`;
    // TODO: Load next file after n seconds
  } else if (file.isVideo) {
    getImgDisplay().container.classList.add('hidden');
    getVidDisplay().container.classList.remove('hidden');
    getVidDisplay().source.src = `/api/video?path=${filePath}/${file.name}`;
    getVidDisplay().video.load();
    // TODO: Load next file after video played once
  }
}

// Controls
function showPreviousFile() {
  // On first file jump to last
  if (currentFileIdx === 0) {
    currentFileIdx = (fileList.length - 1);
  } else {
    currentFileIdx -= 1;
  }

  showFile(currentFileIdx);
}

function showNextFile() {
  // On last file jump to first
  if (currentFileIdx === (fileList.length - 1)) {
    currentFileIdx = 0;
  } else {
    currentFileIdx += 1;
  }

  showFile(currentFileIdx);
}

function addControls() {
  prevBtn = document.querySelector('#ctrl-previous');
  nextBtn = document.querySelector('#ctrl-next');

  prevBtn.addEventListener('click', showPreviousFile);
  nextBtn.addEventListener('click', showNextFile);

  document.addEventListener('click', showNextFile);
  document.addEventListener('keypress', function(e) {
    // Supports vim movements
    switch (e.key) {
      case 'Enter':
      case 'j':
      case 'l':
        showNextFile();
        break;
      case 'k':
      case 'h':
        showPreviousFile();
        break;
    }
  });
}
