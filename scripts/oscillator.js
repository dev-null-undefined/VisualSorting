var oscillator;
function stopOscilator() {
  oscillator.gainOscillator.disconnect();
}
function resumeOscilator() {
  oscillator.gainOscillator.connect(oscillator.oscillatorContext.destination);
}
function createOscilator() {
  oscillator = { oscillatorContext: null, oscillator: null, gainOscillator: null, minF: 100, maxF: 700 };
  oscillator.oscillatorContext = new AudioContext();
  oscillator.oscillatorContext.resume();
  oscillator.oscillator = oscillator.oscillatorContext.createOscillator();
  oscillator.oscillator.type = "sine";
  oscillator.gainOscillator = oscillator.oscillatorContext.createGain();
  oscillator.gainOscillator.gain.value = 0.1;
  oscillator.oscillator.connect(oscillator.gainOscillator);
  oscillator.gainOscillator.connect(oscillator.oscillatorContext.destination);
  oscillator.oscillator.start();
  stopOscilator();
}
function changeFrequency(value) {
  oscillator.oscillator.frequency.value = map_range(value, 0, 1, oscillator.minF, oscillator.maxF);
}
