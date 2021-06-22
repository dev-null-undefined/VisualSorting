// Tim Sort
class TimSort extends Sort {
  constructor() {
    super();
    this.numberOfMarges = 0;
    this.parts = [];
    this.margeMultiplier = 2;
    let deviderIndex = 0;
    do {
      this.parts.push(new Part(deviderIndex, deviderIndex + TimSort.timPartSize()));
      deviderIndex += TimSort.timPartSize();
    } while (deviderIndex < arrayToSort.length);
    this.currentPart = null;
    this.pointerB = null;
    this.pointerA = null;
    this.numberOfMarges = 0;
    this.margesMultiplier = 2;
  }
  static timPartSize() {
    return 32;
  }
  step() {
    if (this.currentPart === null) {
      this.currentPart = 0;
    } else if (!this.doneInserting) {
      // Inserting part of Tim sort
      const part = this.parts[this.currentPart];
      if (!this.index) {
        this.index = part.a + 1;
        this.done = part.a;
        this.comparing = part.a;
      } else if (this.done === arrayToSort.length - 1 || this.done === part.b) {
        if (this.currentPart < this.parts.length - 1) {
          this.currentPart++;
        } else {
          this.doneInserting = true;
        }
      } else if (getValue(arrayToSort, this.index, false) > getValue(arrayToSort, this.comparing)) {
        move(this.index, this.comparing + 1, arrayToSort);
        this.done++;
        this.index = this.done + 1;
        this.comparing = this.done;
      } else if (this.comparing === part.a) {
        move(this.index, part.a, arrayToSort);
        this.done++;
        this.index = this.done + 1;
        this.comparing = this.done;
      } else {
        this.comparing--;
      }
    } else if (this.pointerB === null) {
      // Marge part of the Tim sort
      this.pointerB = (this.numberOfMarges + this.margesMultiplier / 2) * TimSort.timPartSize();
      this.pointerA = this.numberOfMarges * TimSort.timPartSize();
    } else {
      if (
        this.pointerA >= (this.numberOfMarges + this.margesMultiplier) * TimSort.timPartSize() ||
        this.pointerB >= (this.numberOfMarges + this.margesMultiplier) * TimSort.timPartSize() ||
        this.pointerB >= arrayToSort.length ||
        this.pointerA >= arrayToSort.length
      ) {
        if (this.pointerB >= arrayToSort.length || this.pointerA >= arrayToSort.length) {
          if (this.margesMultiplier * TimSort.timPartSize() < arrayToSort.length) {
            this.margesMultiplier *= 2;
            this.numberOfMarges = 0;
            this.pointerB = null;
          } else {
            return true;
          }
        } else {
          this.numberOfMarges += this.margesMultiplier;
          this.pointerB = null;
        }
      } else if (getValue(arrayToSort, this.pointerA, false) < getValue(arrayToSort, this.pointerB)) {
        this.pointerA++;
      } else {
        move(this.pointerB, this.pointerA, arrayToSort);
        this.pointerB++;
      }
    }
  }
  draw(cnt) {
    cnt.fillStyle = "#000";
    cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
    const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
    arrayToSort.forEach((element, index) => {
      if (this.doneInserting) {
        if (index === this.pointerA) {
          cnt.fillStyle = "#ff0000";
        } else if (index === this.pointerB) {
          cnt.fillStyle = "#c6d618";
        } else {
          cnt.fillStyle = getColorBasedOnValue(element);
        }
      } else if (index === this.index) {
        cnt.fillStyle = "#0e66c9";
      } else if (index === this.comparing) {
        cnt.fillStyle = "#c6d618";
      } else if (index <= this.done && index >= this.currentPart * TimSort.timPartSize()) {
        cnt.fillStyle = "#35d618";
      } else {
        cnt.fillStyle = getColorBasedOnValue(element);
      }
      cnt.fillRect(
        index * sizeOfBlock + sizeOfBlock * 0.025,
        0,
        sizeOfBlock * 0.95,
        cnt.canvas.height * element * 0.75
      );
    });
    cnt.fillStyle = "#ff0000";
    if (!this.doneInserting && this.currentPart !== null) {
      cnt.fillRect(this.parts[this.currentPart].a * sizeOfBlock, 0, 2, cnt.canvas.height);
      if (this.parts[this.currentPart].b + 1 > arrayToSort.length) {
        cnt.fillRect(arrayToSort.length * sizeOfBlock - 1, 0, 2, cnt.canvas.height);
      } else {
        cnt.fillRect((this.parts[this.currentPart].b + 1) * sizeOfBlock - 1, 0, 2, cnt.canvas.height);
      }
    } else if (this.doneInserting) {
      cnt.fillRect(this.numberOfMarges * TimSort.timPartSize() * sizeOfBlock, 0, 2, cnt.canvas.height);
      if ((this.numberOfMarges + this.margesMultiplier) * TimSort.timPartSize() > arrayToSort.length) {
        cnt.fillRect(arrayToSort.length * sizeOfBlock - 1, 0, 2, cnt.canvas.height);
      } else {
        cnt.fillRect(
          (this.numberOfMarges + this.margesMultiplier) * TimSort.timPartSize() * sizeOfBlock - 1,
          0,
          2,
          cnt.canvas.height
        );
      }
    }
  }
}
