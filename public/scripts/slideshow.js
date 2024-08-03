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

  var btnIcon = document.querySelector('#ctrl-play-pause svg use');
  if (playPause) {
    btnIcon.setAttribute('href', '/static/vendor/feather-icons/feather-sprite.svg#pause');
  } else {
    btnIcon.setAttribute('href', '/static/vendor/feather-icons/feather-sprite.svg#play');
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

function handleAnimationStart(e) {
  var el = e.target;

  if (el.classList.contains('fade-in')) {
    el.classList.remove('hidden');
  }
}

function handleImgAnimationEnd(e) {
  var el = e.target;

  if (el.classList.contains('fade-out')) {
    el.classList.add('hidden');
  }
}

function handleVidAnimationEnd(e) {
  var el = e.target;

  if (el.classList.contains('fade-out')) {
    el.classList.add('hidden');
  }
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

  getImgDisplay().container.addEventListener("animationstart", handleAnimationStart, false);
  getImgDisplay().container.addEventListener("animationend", handleImgAnimationEnd, false);
  getVidDisplay().container.addEventListener("animationstart", handleAnimationStart, false);
  getVidDisplay().container.addEventListener("animationend", handleVidAnimationEnd, false);
}

function setComputedOpacity(el) {
  var computedStyle = window.getComputedStyle(el);
  // opacity = computedStyle.getPropertyValue('margin-left');
  el.style.opacity = computedStyle.getPropertyValue('opacity');
}

function showFile(idx) {
  var file = fileList[idx];
  var imgDisplayContainer = getImgDisplay().container;
  var vidDisplayContainer = getVidDisplay().container;

  if (file.isImage) {
    if (vidDisplayContainer.checkVisibility()) {
      // vidDisplayContainer.classList.add('hidden');
      // setComputedOpacity(vidDisplayContainer);
      vidDisplayContainer.classList.remove('fade-in');
      vidDisplayContainer.classList.add('fade-out');
    } else if (imgDisplayContainer.checkVisibility()) {
      imgDisplayContainer.classList.remove('fade-in');
      imgDisplayContainer.classList.add('fade-out');
    }

    getImgDisplay().img.src = `/api/image?path=${filePath}/${file.name}`;

    // if (!imgDisplayContainer.checkVisibility()) {
      if (imgDisplayContainer.classList.contains('hidden')) {
        // First time displaying image
        imgDisplayContainer.classList.remove('hidden');
      }
      // setComputedOpacity(imgDisplayContainer);
      imgDisplayContainer.classList.remove('fade-out');
      imgDisplayContainer.classList.add('fade-in');
    // }
    // Load next file after n seconds
    if (playPause) {
      setTimeout(showNextFile, config.image.duration * 1000);
    }
  } else if (file.isVideo) {
    if (imgDisplayContainer.checkVisibility()) {
      // imgDisplayContainer.classList.add('hidden');
      // setComputedOpacity(imgDisplayContainer);
      imgDisplayContainer.classList.remove('fade-in');
      imgDisplayContainer.classList.add('fade-out');
    } else if (vidDisplayContainer.checkVisibility()) {
      vidDisplayContainer.classList.remove('fade-in');
      vidDisplayContainer.classList.add('fade-out');
    }

    getVidDisplay().source.src = `/api/video?path=${filePath}/${file.name}`;
    getVidDisplay().video.load();

    // if (!vidDisplayContainer.checkVisibility()) {
      if (vidDisplayContainer.classList.contains('hidden')) {
        // First time displaying video
        vidDisplayContainer.classList.remove('hidden');
      }
      // setComputedOpacity(vidDisplayContainer);
      vidDisplayContainer.classList.remove('fade-out');
      vidDisplayContainer.classList.add('fade-in');
    // }
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
  getVidDisplay().video.pause();

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
  getVidDisplay().video.pause();

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
