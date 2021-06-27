// Radix Sort
class LSDRadixSort extends Sort {
  constructor() {
    super();
    this.currentDigit = 17;
    this.buckets = [];
    for (let i = 0; i < 10; i++) {
      this.buckets[i] = [];
    }
    this.position = 0;
    this.index = 0;
    this.digit = 0;
  }
  step() {
    this.tempArray = [];
    if (this.index >= arrayToSort.length) {
      this.digit++;
      this.index = this.position;
    }
    if (this.digit > 9) {
      this.digit = 0;
      this.index = 0;
      this.position = 0;
      this.currentDigit--;
      if (this.currentDigit == 1) {
        return true;
      }
    }
    if (this.getDigit(getValue(arrayToSort, this.index), this.currentDigit) == this.digit) {
      move(this.index, this.position, arrayToSort);
      this.position++;
    }
    this.index++;
  }
  getDigit(number, position) {
    if (number.toString().length <= position) {
      return 0;
    } else {
      return number.toString()[position];
    }
  }
  draw(cnt) {
    cnt.fillStyle = "#000";
    cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
    const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
    arrayToSort.forEach((element, index) => {
      cnt.fillStyle = getColorBasedOnValue(element);
      cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.99, cnt.canvas.height * element);
    });
  }
}
