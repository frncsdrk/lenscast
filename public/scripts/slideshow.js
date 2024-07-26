var filePath;
var fileList;
var currentFileIdx = 0;
var playPause = true;
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

function setPlayPause(v) {
  playPause = v;

  var btn = document.querySelector('#ctrl-play-pause');
  if (playPause) {
    btn.innerText = 'Pause';
  } else {
    btn.innerText = 'Play';
  }
}

function togglePlayPause() {
  setPlayPause(!playPause);
}

function getImgDisplay() {
  return {
    container: document.querySelector('#img-display'),
    img: document.querySelector('#img-display img'),
  };
}

function getVidDisplay() {
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

  getVidDisplay().video.addEventListener('ended', (e) => {
    if (playPause) {
      showNextFile();
    }
  });
}

function showFile(idx) {
  var file = fileList[idx];

  if (file.isImage) {
    getVidDisplay().container.classList.add('hidden');
    getImgDisplay().container.classList.remove('hidden');
    getImgDisplay().img.src = `/api/image?path=${filePath}/${file.name}`;
    // Load next file after n seconds
    if (playPause) {
      setTimeout(showNextFile, config.image.duration * 1000);
    }
  } else if (file.isVideo) {
    getImgDisplay().container.classList.add('hidden');
    getVidDisplay().container.classList.remove('hidden');
    getVidDisplay().source.src = `/api/video?path=${filePath}/${file.name}`;
    getVidDisplay().video.load();
    // After video played once next file is opened via event handler
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

  setPlayPause(false);

  showFile(currentFileIdx);
}

function showNextFile() {
  // On last file jump to first
  if (currentFileIdx === (fileList.length - 1)) {
    currentFileIdx = 0;
  } else {
    currentFileIdx += 1;
  }

  setPlayPause(true);

  showFile(currentFileIdx);
}

function addControls() {
  prevBtn = document.querySelector('#ctrl-previous');
  nextBtn = document.querySelector('#ctrl-next');
  playPauseBtn = document.querySelector('#ctrl-play-pause');

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPreviousFile();
  });
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextFile();
  });
  playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayPause();
  });

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
      case 'p':
        togglePlayPause();
        break;
    }
  });
}
