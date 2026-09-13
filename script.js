const tracks = [
  { name: "Noisy input", detail: "Unprocessed mixture", file: "input_sound.wav" },
  { name: "Proposed method", detail: "Enhanced output", file: "processed_sound.wav", featured: true },
  { name: "MMSE", detail: "Baseline method", file: "processed_sound_MMSE.wav" },
  { name: "MPDR", detail: "Baseline method", file: "processed_sound_MPDR.wav" },
  { name: "MVDR - Closeness", detail: "Baseline method", file: "processed_sound_MVDR_closeness.wav" },
  { name: "MVDR - Directional", detail: "Baseline method", file: "processed_sound_MVDR_directional.wav" },
  { name: "No post-filter", detail: "Ablation output", file: "processed_sound_NoPF.wav" },
];

const state = {
  environment: "anechoic",
  snr: "-05dB",
  currentAudio: null,
  animationFrame: null,
};

const template = document.querySelector("#player-template");
const trackList = document.querySelector("#track-list");
const selectionSummary = document.querySelector("#selection-summary");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function getPath(file) {
  return `assets/audio/${state.environment}/${state.snr}/${file}`;
}

function stopCurrentAudio(except = null) {
  if (state.currentAudio && state.currentAudio !== except) {
    state.currentAudio.pause();
  }
}

function drawFallback(canvas) {
  const context = canvas.getContext("2d");
  const { width, height } = canvas;
  context.clearRect(0, 0, width, height);
  context.fillStyle = getComputedStyle(canvas).color || "#777";
  for (let x = 1; x < width; x += 4) {
    const wave = 3 + Math.abs(Math.sin(x * 0.19) * Math.cos(x * 0.037)) * (height * 0.34);
    context.fillRect(x, height / 2 - wave / 2, 1, wave);
  }
}

async function drawWaveform(canvas, source) {
  const ratio = window.devicePixelRatio || 1;
  const box = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(box.width * ratio));
  canvas.height = Math.max(1, Math.floor(box.height * ratio));
  drawFallback(canvas);

  try {
    const response = await fetch(source);
    const audioData = await response.arrayBuffer();
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const buffer = await audioContext.decodeAudioData(audioData);
    const samples = buffer.getChannelData(0);
    const context = canvas.getContext("2d");
    const step = Math.max(1, Math.floor(samples.length / canvas.width));
    const middle = canvas.height / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = getComputedStyle(canvas).color || "#777";
    for (let x = 0; x < canvas.width; x += Math.max(2, Math.floor(3 * ratio))) {
      let peak = 0;
      const offset = x * step;
      for (let i = 0; i < step; i += 8) {
        peak = Math.max(peak, Math.abs(samples[offset + i] || 0));
      }
      const barHeight = Math.max(2 * ratio, peak * canvas.height * 0.9);
      context.fillRect(x, middle - barHeight / 2, Math.max(1, ratio), barHeight);
    }
    await audioContext.close();
  } catch (error) {
    // The fallback waveform remains visible when decoding is unavailable.
  }
}

function updateProgress(track, audio) {
  const progress = audio.duration ? audio.currentTime / audio.duration : 0;
  track.querySelector(".progress-line").style.left = `${progress * 100}%`;
  track.querySelector(".time").textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  track.classList.toggle("has-progress", progress > 0);

  if (!audio.paused) {
    state.animationFrame = requestAnimationFrame(() => updateProgress(track, audio));
  }
}

function attachPlayer(track, source) {
  const audio = track.querySelector("audio");
  const playButton = track.querySelector(".play-button");
  const waveformButton = track.querySelector(".waveform-button");
  const canvas = track.querySelector("canvas");

  audio.src = source;
  drawWaveform(canvas, source);

  audio.addEventListener("loadedmetadata", () => updateProgress(track, audio));
  audio.addEventListener("play", () => {
    stopCurrentAudio(audio);
    state.currentAudio = audio;
    track.classList.add("is-playing");
    playButton.setAttribute("aria-label", "Pause");
    cancelAnimationFrame(state.animationFrame);
    updateProgress(track, audio);
  });
  audio.addEventListener("pause", () => {
    track.classList.remove("is-playing");
    playButton.setAttribute("aria-label", "Play");
    updateProgress(track, audio);
  });
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    updateProgress(track, audio);
  });

  playButton.addEventListener("click", () => {
    if (audio.paused) audio.play();
    else audio.pause();
  });

  waveformButton.addEventListener("click", (event) => {
    if (!audio.duration) return;
    const rect = waveformButton.getBoundingClientRect();
    audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
    updateProgress(track, audio);
  });
}

function createTrack(item, index, source) {
  const fragment = template.content.cloneNode(true);
  const track = fragment.querySelector(".track");
  track.querySelector(".track-index").textContent = String(index + 1).padStart(2, "0");
  track.querySelector(".track-name").textContent = item.name;
  track.querySelector(".track-detail").textContent = item.detail;

  if (item.featured) {
    track.classList.add("is-featured");
    track.querySelector(".track-name").insertAdjacentHTML("beforeend", '<span class="method-badge">Ours</span>');
  }

  attachPlayer(track, source);
  return fragment;
}

function renderTracks() {
  stopCurrentAudio();
  state.currentAudio = null;
  trackList.replaceChildren();
  tracks.forEach((item, index) => {
    trackList.appendChild(createTrack(item, index, getPath(item.file)));
  });

  const environment = state.environment === "anechoic" ? "Anechoic" : "Reverberative";
  selectionSummary.textContent = `${environment} / ${state.snr.replace("dB", " dB")}`;
}

function setupSegmentedControl(id, key) {
  const control = document.querySelector(id);
  control.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.dataset.value === state[key]) return;
    state[key] = button.dataset.value;
    control.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    renderTracks();
  });
}

const referenceHost = document.querySelector('[data-track="reference"]');
referenceHost.appendChild(
  createTrack(
    { name: "Clean reference", detail: "Original target" },
    0,
    "assets/audio/ref_sound.wav",
  ),
);

setupSegmentedControl("#environment-control", "environment");
setupSegmentedControl("#snr-control", "snr");
renderTracks();

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.querySelectorAll(".waveform").forEach((canvas) => {
      const audio = canvas.closest(".track").querySelector("audio");
      drawWaveform(canvas, audio.src);
    });
  }, 150);
});
