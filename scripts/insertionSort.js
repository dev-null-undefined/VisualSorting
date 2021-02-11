// Insertion Sort
class InsertionSort extends Sort {
  constructor() {
    super();
    this.index = 1;
    this.done = 0;
    this.comparing = 0;
  }
  step() {
    if (this.done === arrayToSort.length - 1) {
      return true;
    }
    if (getValue(arrayToSort, this.index, false) > getValue(arrayToSort, this.comparing)) {
      move(this.index, this.comparing + 1, arrayToSort);
      this.done++;
      this.index = this.done + 1;
      this.comparing = this.done;
    } else if (this.comparing === 0) {
      move(this.index, 0, arrayToSort);
      this.done++;
      this.index = this.done + 1;
      this.comparing = this.done;
    } else {
      this.comparing--;
    }
  }
  draw(cnt) {
    cnt.fillStyle = "#000";
    cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
    const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
    arrayToSort.forEach((element, index) => {
      if (index === this.index) {
        cnt.fillStyle = "#0e66c9";
      } else if (index === this.comparing) {
        cnt.fillStyle = "#c6d618";
      } else if (index <= this.done) {
        cnt.fillStyle = "#35d618";
      } else {
        cnt.fillStyle = "#FFF";
      }
      cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.95, cnt.canvas.height * element);
    });
  }
}
