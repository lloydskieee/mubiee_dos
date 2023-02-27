var btns = document.querySelectorAll('.btn');

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
        var current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
    });
}

const player = document.querySelector('.video-container');
const iframe = player.querySelector('iframe');
const playPauseBtn = player.querySelector('.play-pause');
const seekBar = player.querySelector('.seek-bar');
const currentTime = player.querySelector('.current-time');
const duration = player.querySelector('.duration');
const muteBtn = player.querySelector('.mute');
const volumeBar = player.querySelector('.volume-bar');
const fullscreenBtn = player.querySelector('.fullscreen');

let isPlaying = false;
let isMuted = false;
let isFullscreen = false;

function playPause() {
  if (isPlaying) {
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
  
  
  function updateCurrentTime() {
  let currentTimeValue = iframe.contentWindow.getPlayerState() == 1 ? iframe.contentWindow.getCurrentTime() : 0;
  currentTime.textContent = formatTime(currentTimeValue);
  seekBar.value = currentTimeValue;
  if (iframe.contentWindow.getPlayerState() == 0) {
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  isPlaying = false;
  }
  if (isPlaying) {
  requestAnimationFrame(updateCurrentTime);
  }
  }
  
  function setSeekBar() {
  let durationValue = iframe.contentWindow.getDuration();
  duration.textContent = formatTime(durationValue);
  seekBar.max = durationValue;
  }
  
  function setMute() {
  if (isMuted) {
  iframe.contentWindow.unMute();
  muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
  iframe.contentWindow.mute();
  muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
  isMuted = !isMuted;
  }
  
  function setVolume() {
  iframe.contentWindow.setVolume(volumeBar.value);
  if (volumeBar.value == 0) {
  muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  isMuted = true;
  } else {
  muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  isMuted = false;
  }
  }
  
  function setFullscreen() {
  if (!isFullscreen) {
  if (player.requestFullscreen) {
  player.requestFullscreen();
  } else if (player.webkitRequestFullscreen) { /* Safari /
  player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) { / IE11 /
  player.msRequestFullscreen();
  }
  fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  } else {
  if (document.exitFullscreen) {
  document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { / Safari /
  document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { / IE11 */
  document.msExitFullscreen();
  }
  fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  }
  isFullscreen = !isFullscreen;
  }
  
  playPauseBtn.addEventListener('click', playPause);
  
  seekBar.addEventListener('input', function() {
  iframe.contentWindow.seekTo(seekBar.value);
  });
  
  muteBtn.addEventListener('click', setMute);
  
  volumeBar.addEventListener('input', setVolume);
  
  fullscreenBtn.addEventListener('click', setFullscreen);
  
  iframe.addEventListener('load', function() {
  setSeekBar();
  requestAnimationFrame(updateCurrentTime);
  });

  function activateButton(event) {
  // remove active class from all buttons
  const buttons = document.querySelectorAll(".episode-btn");
  buttons.forEach(button => button.classList.remove("active"));
  
  // add active class to clicked button
  const clickedButton = event.target;
  clickedButton.classList.add("active");
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
            /* Check if the element has an ID and matches the target: */
            if (elmnt.id == "movie2") {
              /* Find the specific line to insert the contents: */
              var target = elmnt.querySelector(".movie-list");
              target.innerHTML += this.responseText;
            }
          }
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
