class Oscillator {
    constructor() {
        this.initializated=false;
    }
    initialize(){
        if(!this.initializated){
            this.initializated=true;
            this.minF = 100;
            this.maxF = 700;
            this.oscillatorContext = new AudioContext();
            this.oscillatorContext.resume();
            this.oscillator = this.oscillatorContext.createOscillator();
            this.oscillator.type = "sine";
            this.gainOscillator = this.oscillatorContext.createGain();
            this.gainOscillator.gain.value = 0.005;
            this.oscillator.connect(this.gainOscillator);
            this.gainOscillator.connect(this.oscillatorContext.destination);
            this.oscillator.start();
            this.stop();
        }
    }
    stop() {
        this.initialize();
        this.gainOscillator.disconnect();
    }

    resume() {
        this.initialize();
        this.gainOscillator.connect(this.oscillatorContext.destination);
    }

    changeFrequency(value) {
        this.oscillator.frequency.value = map_range(value, 0, 1, this.minF, this.maxF);
    }
}

let oscillator = new Oscillator();
