const tracks = [
  { name: "Noisy input", detail: "Unprocessed mixture", file: "input_sound.wav" },
  { name: "Proposed method", detail: "Enhanced output", file: "processed_sound.wav", featured: true },
  { name: "MMSE", detail: "Baseline method", file: "processed_sound_MMSE.wav" },
  { name: "MPDR", detail: "Baseline method", file: "processed_sound_MPDR.wav" },
  { name: "MVDR - Closeness", detail: "Baseline method", file: "processed_sound_MVDR_closeness.wav" },
  { name: "MVDR - Directional", detail: "Baseline method", file: "processed_sound_MVDR_directional.wav" },
  { name: "No post-filter", detail: "Ablation output", file: "processed_sound_NoPF.wav" },
];

const snrLevels = [-25, -20, -15, -10, -5];

const chartSeries = [
  { id: "noisy", name: "Noisy input", color: "#8b8e91", dash: "5 5" },
  { id: "mpdr", name: "MPDR", color: "#756bb1" },
  { id: "directional", name: "MVDR (directional)", color: "#3b82b8" },
  { id: "closeness", name: "MVDR (closeness)", color: "#0d7773" },
  { id: "mmse", name: "MMSE", color: "#d1902f" },
  { id: "noPostFilter", name: "Proposed (no post-filter)", color: "#9a5b44", dash: "3 4" },
  { id: "proposed", name: "Proposed", color: "#ef5b3f", featured: true },
];

const doaSeries = [
  { id: "music", name: "MUSIC", color: "#756bb1" },
  { id: "srpPhat", name: "SRP-PHAT", color: "#16181b", dash: "5 4" },
  { id: "whisk", name: "wHisK", color: "#0d7773", dash: "3 3" },
  { id: "proposed", name: "Proposed", color: "#ef5b3f", featured: true },
];

const metricConfig = {
  siSdr: { label: "SI-SDR", unit: "dB", decimals: 2 },
  pesq: { label: "PESQ", unit: "", decimals: 3 },
  estoi: { label: "ESTOI", unit: "", decimals: 3 },
  dnsMos: { label: "DNSMOS", unit: "", decimals: 3 },
  doaAccuracy: { label: "Accuracy", unit: "%", decimals: 2 },
  doaMae: { label: "MAE", unit: "deg", decimals: 3 },
};

const performanceData = {
  anechoic: {
    siSdr: {
      noisy: [-24.826, -19.825, -14.825, -9.829, -4.83],
      mpdr: [-12.957, -7.646, -3.656, -0.806, 1.171],
      directional: [-11.023, -5.652, -1.658, 0.329, 3.626],
      closeness: [-10.15, -3.199, 1.963, 5.815, 8.872],
      mmse: [-11.823, -5.39, -0.711, 2.286, 3.999],
      noPostFilter: [-9.169, -2.361, 2.662, 6.344, 9.218],
      proposed: [-2.446, 2.659, 6.126, 8.685, 10.744],
    },
    pesq: {
      noisy: [1.11, 1.143, 1.213, 1.354, 1.592],
      mpdr: [1.214, 1.341, 1.514, 1.738, 2.014],
      directional: [1.23, 1.368, 1.555, 1.801, 2.112],
      closeness: [1.252, 1.442, 1.691, 1.983, 2.321],
      mmse: [1.233, 1.42, 1.689, 2.037, 2.46],
      noPostFilter: [1.267, 1.463, 1.708, 1.993, 2.326],
      proposed: [1.449, 1.734, 2.035, 2.335, 2.653],
    },
    estoi: {
      noisy: [0.138, 0.22, 0.309, 0.403, 0.502],
      mpdr: [0.233, 0.326, 0.417, 0.513, 0.613],
      directional: [0.243, 0.34, 0.436, 0.537, 0.641],
      closeness: [0.242, 0.34, 0.435, 0.535, 0.642],
      mmse: [0.213, 0.301, 0.39, 0.482, 0.58],
      noPostFilter: [0.244, 0.344, 0.442, 0.544, 0.65],
      proposed: [0.249, 0.352, 0.454, 0.564, 0.673],
    },
    dnsMos: {
      noisy: [1.431, 1.257, 1.196],
      mpdr: [2.02, 1.75, 1.582],
      directional: [2.262, 1.867, 1.684],
      closeness: [2.385, 2.02, 1.774],
      mmse: [2.107, 2.258, 1.686],
      noPostFilter: [2.641, 2.204, 1.92],
      proposed: [2.895, 2.883, 2.245],
    },
  },
  reverberative: {
    siSdr: {
      noisy: [-24.319, -19.325, -14.346, -9.406, -4.586],
      mpdr: [-15.276, -10.172, -6.515, -3.918, -2.214],
      directional: [-13.374, -8.365, -4.933, -2.454, -0.702],
      closeness: [-12.599, -5.912, -1.409, 1.57, 3.479],
      mmse: [-11.908, -6.204, -2.839, -0.913, 0.06],
      noPostFilter: [-11.616, -5.101, -0.808, 1.938, 3.654],
      proposed: [-5.134, -0.462, 1.9, 3.387, 4.372],
    },
    pesq: {
      noisy: [1.115, 1.153, 1.233, 1.387, 1.631],
      mpdr: [1.186, 1.273, 1.391, 1.545, 1.728],
      directional: [1.201, 1.301, 1.438, 1.623, 1.85],
      closeness: [1.219, 1.368, 1.573, 1.827, 2.118],
      mmse: [1.245, 1.43, 1.685, 2.005, 2.366],
      noPostFilter: [1.231, 1.386, 1.589, 1.836, 2.12],
      proposed: [1.379, 1.608, 1.849, 2.1, 2.369],
    },
    estoi: {
      noisy: [0.147, 0.226, 0.312, 0.403, 0.497],
      mpdr: [0.217, 0.303, 0.387, 0.477, 0.569],
      directional: [0.229, 0.32, 0.409, 0.505, 0.601],
      closeness: [0.229, 0.324, 0.415, 0.513, 0.614],
      mmse: [0.209, 0.293, 0.374, 0.459, 0.547],
      noPostFilter: [0.231, 0.328, 0.422, 0.521, 0.622],
      proposed: [0.235, 0.334, 0.434, 0.54, 0.643],
    },
    dnsMos: {
      noisy: [1.343, 1.216, 1.157],
      mpdr: [1.618, 1.433, 1.342],
      directional: [1.793, 1.518, 1.427],
      closeness: [2.06, 1.759, 1.586],
      mmse: [1.968, 2.184, 1.598],
      noPostFilter: [2.19, 1.864, 1.666],
      proposed: [2.678, 2.713, 2.077],
    },
  },
};

const doaData = {
  anechoic: {
    doaAccuracy: {
      music: [0, 19.17, 100, 100, 100],
      srpPhat: [34.58, 84.79, 100, 100, 100],
      whisk: [56.46, 87.08, 98.96, 100, 100],
      proposed: [98.12, 99.58, 100, 100, 100],
    },
    doaMae: {
      music: [72.438, 47.979, 0, 0, 0],
      srpPhat: [64.74, 21.573, 0, 0, 0],
      whisk: [11.688, 2.354, 0.156, 0, 0],
      proposed: [1.219, 0.271, 0, 0, 0],
    },
  },
  reverberative: {
    doaAccuracy: {
      music: [0, 0.83, 25, 98.96, 100],
      srpPhat: [32.71, 65.21, 96.67, 100, 100],
      whisk: [46.04, 74.58, 91.67, 97.29, 98.54],
      proposed: [94.79, 99.58, 100, 100, 100],
    },
    doaMae: {
      music: [42.5, 40.406, 26.385, 0.26, 0.031],
      srpPhat: [65.177, 41.875, 4.677, 0, 0],
      whisk: [11.865, 4.229, 1.25, 0.406, 0.219],
      proposed: [3.052, 0.396, 0, 0, 0],
    },
  },
};

const state = {
  environment: "anechoic",
  snr: "-05dB",
  view: "speech",
  metric: "siSdr",
  hiddenSeries: new Set(),
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
  track.querySelector(".progress-fill").style.width = `${progress * 100}%`;
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

  const environment = state.environment === "anechoic" ? "Anechoic" : "Reverberant";
  selectionSummary.textContent = `${environment} / ${Number.parseInt(state.snr, 10)} dB`;
}

function createSvgElement(name, attributes = {}, content = "") {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (content) element.textContent = content;
  return element;
}

function getTickStep(range) {
  const roughStep = range / 5;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return factor * magnitude;
}

function showChartTooltip(series, value, xLabel, point) {
  const tooltip = document.querySelector("#chart-tooltip");
  const condition = state.metric === "dnsMos" ? xLabel : `${xLabel} dB`;
  tooltip.innerHTML = `<strong>${series.name}</strong><br>${condition} &middot; ${metricConfig[state.metric].label}: ${value.toFixed(metricConfig[state.metric].decimals)}`;
  const pointX = point.hasAttribute("cx")
    ? Number(point.getAttribute("cx"))
    : Number(point.getAttribute("x")) + Number(point.getAttribute("width")) / 2;
  const pointY = point.hasAttribute("cy") ? Number(point.getAttribute("cy")) : Number(point.getAttribute("y"));
  tooltip.style.left = `${(pointX / 640) * 100}%`;
  tooltip.style.top = `${(pointY / 360) * 100}%`;
  tooltip.classList.add("is-visible");
}

function hideChartTooltip() {
  document.querySelector("#chart-tooltip").classList.remove("is-visible");
}

function renderChart() {
  const svg = document.querySelector("#performance-chart");
  const metric = metricConfig[state.metric];
  const isDoa = state.view === "doa";
  const data = isDoa
    ? doaData[state.environment][state.metric]
    : performanceData[state.environment][state.metric];
  const seriesList = isDoa ? doaSeries : chartSeries;
  const isDnsMos = state.metric === "dnsMos";
  const isLogScale = state.metric === "doaMae";
  const xLabels = isDnsMos ? ["SIG", "BAK", "OVRL"] : snrLevels;
  const selectedSnr = Number.parseInt(state.snr, 10);
  const selectedIndex = isDnsMos ? 2 : snrLevels.indexOf(selectedSnr);
  const width = 640;
  const height = 360;
  const margin = { top: 20, right: 18, bottom: 46, left: 54 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const values = seriesList.flatMap((series) => data[series.id]);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const step = isLogScale ? null : getTickStep(rawMax - rawMin);
  const yMin = isLogScale ? 0.01 : Math.floor(rawMin / step) * step;
  const yMax = isLogScale ? 100 : Math.ceil(rawMax / step) * step;
  const xAt = (index) =>
    isDnsMos
      ? margin.left + ((index + 0.5) / xLabels.length) * plotWidth
      : margin.left + (index / (xLabels.length - 1)) * plotWidth;
  const yAt = (value) => {
    if (isLogScale) {
      const clamped = Math.max(value, yMin);
      return margin.top + ((Math.log10(yMax) - Math.log10(clamped)) / (Math.log10(yMax) - Math.log10(yMin))) * plotHeight;
    }
    return margin.top + ((yMax - value) / (yMax - yMin)) * plotHeight;
  };

  svg.replaceChildren();
  svg.appendChild(
    createSvgElement(
      "title",
      { id: "chart-title" },
      isDnsMos ? "Average DNSMOS P.835 scores" : `${metric.label} by input SNR`,
    ),
  );
  svg.appendChild(
    createSvgElement(
      "desc",
      { id: "chart-description" },
      `${state.environment === "anechoic" ? "Anechoic" : "Reverberant"} ${isDnsMos ? "average " : ""}${isDoa ? "DoA estimation" : "speech enhancement"} results.`,
    ),
  );

  const selectionWidth = isDnsMos ? (plotWidth / xLabels.length) * 0.9 : 44;
  svg.appendChild(
    createSvgElement("rect", {
      class: "chart-selection",
      x: xAt(selectedIndex) - selectionWidth / 2,
      y: margin.top,
      width: selectionWidth,
      height: plotHeight,
      rx: 3,
    }),
  );

  const yTicks = [];
  if (isLogScale) {
    yTicks.push(0.01, 0.1, 1, 10, 100);
  } else {
    for (let value = yMin; value <= yMax + step / 2; value += step) yTicks.push(value);
  }

  yTicks.forEach((value) => {
    const y = yAt(value);
    svg.appendChild(
      createSvgElement("line", {
        class: "chart-grid",
        x1: margin.left,
        x2: width - margin.right,
        y1: y,
        y2: y,
      }),
    );
    const decimals = isLogScale ? (value < 0.1 ? 2 : value < 1 ? 1 : 0) : step < 0.1 ? 2 : step < 1 ? 1 : 0;
    svg.appendChild(
      createSvgElement(
        "text",
        { class: "chart-axis-label", x: margin.left - 10, y: y + 3, "text-anchor": "end" },
        value.toFixed(decimals),
      ),
    );
  });

  xLabels.forEach((label, index) => {
    svg.appendChild(
      createSvgElement(
        "text",
        {
          class: "chart-axis-label",
          x: xAt(index),
          y: height - 20,
          "text-anchor": "middle",
          "font-weight": index === selectedIndex ? "800" : "400",
        },
        String(label),
      ),
    );
  });

  svg.appendChild(
    createSvgElement(
      "text",
      { class: "chart-axis-title", x: width - margin.right, y: height - 2, "text-anchor": "end" },
      isDnsMos ? "DNSMOS P.835 component" : "Input SNR (dB)",
    ),
  );

  const visibleSeries = seriesList.filter((series) => !state.hiddenSeries.has(series.id));

  if (isDnsMos) {
    const groupWidth = (plotWidth / xLabels.length) * 0.78;
    const barWidth = groupWidth / Math.max(visibleSeries.length, 1);
    visibleSeries.forEach((series, seriesIndex) => {
      data[series.id].forEach((value, index) => {
        const bar = createSvgElement("rect", {
          class: `chart-bar${series.featured ? " is-featured" : ""}`,
          x: xAt(index) - groupWidth / 2 + seriesIndex * barWidth + 1,
          y: yAt(value),
          width: Math.max(3, barWidth - 2),
          height: Math.max(0, yAt(yMin) - yAt(value)),
          rx: 1,
          fill: series.color,
          tabindex: 0,
          role: "img",
          "aria-label": `${series.name}, ${xLabels[index]}, ${metric.label} ${value.toFixed(metric.decimals)}`,
        });
        bar.addEventListener("pointerenter", () => showChartTooltip(series, value, xLabels[index], bar));
        bar.addEventListener("pointerleave", hideChartTooltip);
        bar.addEventListener("focus", () => showChartTooltip(series, value, xLabels[index], bar));
        bar.addEventListener("blur", hideChartTooltip);
        svg.appendChild(bar);
      });
    });
  } else {
    visibleSeries.forEach((series) => {
      const points = data[series.id].map((value, index) => `${xAt(index)},${yAt(value)}`).join(" ");
      svg.appendChild(
        createSvgElement("polyline", {
          class: "chart-line",
          points,
          stroke: series.color,
          "stroke-width": series.featured ? 3 : 1.6,
          "stroke-dasharray": series.dash || "",
          opacity: series.featured ? 1 : 0.82,
        }),
      );

      data[series.id].forEach((value, index) => {
        const point = createSvgElement("circle", {
          class: "chart-point",
          cx: xAt(index),
          cy: yAt(value),
          r: index === selectedIndex ? (series.featured ? 5.5 : 4.5) : series.featured ? 4 : 3,
          fill: series.color,
          tabindex: 0,
          role: "img",
          "aria-label": `${series.name}, ${xLabels[index]} dB, ${metric.label} ${value.toFixed(metric.decimals)}`,
        });
        point.addEventListener("pointerenter", () => showChartTooltip(series, value, xLabels[index], point));
        point.addEventListener("pointerleave", hideChartTooltip);
        point.addEventListener("focus", () => showChartTooltip(series, value, xLabels[index], point));
        point.addEventListener("blur", hideChartTooltip);
        svg.appendChild(point);
      });
    });
  }

  if (isDoa) {
    const result = data.proposed[selectedIndex];
    document.querySelector("#chart-metric-name").textContent = `Proposed ${metric.label} at ${selectedSnr} dB`;
    document.querySelector("#chart-insight").textContent = `${result.toFixed(metric.decimals)}${metric.unit ? ` ${metric.unit}` : ""}`;
    document.querySelector("#chart-comparison-note").textContent = isLogScale
      ? "Log scale; zero values are displayed at the 0.01 deg floor"
      : "An estimate is correct when its angular error is within 5 deg";
    document.querySelector("#chart-source").textContent =
      "480 samples per SNR; values reproduced from the DoA performance tables.";
  } else {
    const improvement = data.proposed[selectedIndex] - data.noisy[selectedIndex];
    const sign = improvement >= 0 ? "+" : "";
    document.querySelector("#chart-metric-name").textContent = `${metric.label}${isDnsMos ? " OVRL" : ""} improvement`;
    document.querySelector("#chart-insight").textContent = `${sign}${improvement.toFixed(metric.decimals)}${metric.unit ? ` ${metric.unit}` : ""}`;
    document.querySelector("#chart-comparison-note").textContent = isDnsMos
      ? "Proposed vs. noisy input, averaged across all SNRs"
      : "Proposed vs. noisy input at the selected SNR";
    document.querySelector("#chart-source").textContent =
      "Simulated test set; values reproduced from Table 1 of the paper.";
  }
}

function renderChartLegend() {
  const legend = document.querySelector("#chart-legend");
  const seriesList = state.view === "doa" ? doaSeries : chartSeries;
  legend.replaceChildren();
  seriesList.forEach((series) => {
    const label = document.createElement("label");
    label.className = "legend-item";
    label.style.setProperty("--series-color", series.color);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !state.hiddenSeries.has(series.id);
    checkbox.setAttribute("aria-label", `Show ${series.name}`);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) state.hiddenSeries.delete(series.id);
      else state.hiddenSeries.add(series.id);
      renderChart();
    });

    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    const name = document.createElement("span");
    name.textContent = series.name;
    label.append(checkbox, swatch, name);
    legend.appendChild(label);
  });
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
    renderChart();
  });
}

function setupMetricControl(id) {
  const control = document.querySelector(id);
  control.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.dataset.value === state.metric) return;
    state.metric = button.dataset.value;
    control.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    renderChart();
  });
}

function setupViewControl() {
  const control = document.querySelector("#view-control");
  control.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.dataset.value === state.view) return;
    state.view = button.dataset.value;
    state.metric = state.view === "doa" ? "doaAccuracy" : "siSdr";
    control.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    document.querySelector("#speech-metrics").hidden = state.view !== "speech";
    document.querySelector("#doa-metrics").hidden = state.view !== "doa";
    document.querySelectorAll("#metric-control button, #doa-metric-control button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item.dataset.value === state.metric));
    });
    state.hiddenSeries.clear();
    renderChartLegend();
    renderChart();
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
setupViewControl();
setupMetricControl("#metric-control");
setupMetricControl("#doa-metric-control");
renderTracks();
renderChartLegend();
renderChart();

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
