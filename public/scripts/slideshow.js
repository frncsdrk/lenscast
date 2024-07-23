var filePath;
var fileList;
var currentFileIdx = 0;

addEventListener('load', function() {
  console.log('Hello, slideshow!');

  filePath = document.querySelector('#slideshow-path').innerText;
  fileList = JSON.parse(document.querySelector('#slideshow-files').innerText);

  console.log('files:', fileList);

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

function showFile(idx) {
  var file = fileList[idx];

  if (file.isImage) {
    getVidDisplay().container.classList.add('hidden');
    getImgDisplay().container.classList.remove('hidden');
    getImgDisplay().img.src = `/api/image?path=${filePath}/${file.name}`;
  } else if (file.isVideo) {
    getImgDisplay().container.classList.add('hidden');
    getVidDisplay().container.classList.remove('hidden');
    getVidDisplay().source.src = `/api/video?path=${filePath}/${file.name}`;
    getVidDisplay().video.load();
  }
}

// Controls
function showPreviousFile() {
  // TODO: Behavior on first file
  currentFileIdx -= 1;
  showFile(currentFileIdx);
}

function showNextFile() {
  // TODO: Behavior on last file
  currentFileIdx += 1;
  showFile(currentFileIdx);
}

function addControls() {
  prevBtn = document.querySelector('#ctrl-previous');
  nextBtn = document.querySelector('#ctrl-next');

  prevBtn.addEventListener('click', showPreviousFile);
  nextBtn.addEventListener('click', showNextFile);

  // TODO: Arrow keys, vim movements, space bar, enter, backspace
}
