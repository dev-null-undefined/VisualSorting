let oscillator;

function stopOscillator() {
  oscillator.gainOscillator.disconnect();
}
function resumeOscillator() {
  oscillator.gainOscillator.connect(oscillator.oscillatorContext.destination);
}
function createOscillator() {
  oscillator = { oscillatorContext: null, oscillator: null, gainOscillator: null, minF: 100, maxF: 700 };
  oscillator.oscillatorContext = new AudioContext();
  oscillator.oscillatorContext.resume();
  oscillator.oscillator = oscillator.oscillatorContext.createOscillator();
  oscillator.oscillator.type = "sine";
  oscillator.gainOscillator = oscillator.oscillatorContext.createGain();
  oscillator.gainOscillator.gain.value = 0.005;
  oscillator.oscillator.connect(oscillator.gainOscillator);
  oscillator.gainOscillator.connect(oscillator.oscillatorContext.destination);
  oscillator.oscillator.start();
  stopOscillator();
}
function changeFrequency(value) {
  oscillator.oscillator.frequency.value = map_range(value, 0, 1, oscillator.minF, oscillator.maxF);
}
