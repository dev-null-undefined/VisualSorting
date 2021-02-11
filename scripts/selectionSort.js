// Selection sort
class SelectionSort extends Sort {
  constructor() {
    super();
    this.doneIndex = 0;
  }
  step() {
    this.currentMinimumIndex = minIndex(arrayToSort.slice(this.doneIndex));
    swap(this.doneIndex + this.currentMinimumIndex, this.doneIndex, arrayToSort);
    getValue(arrayToSort, this.doneIndex++);
    return this.doneIndex === arrayToSort.length;
  }
  draw(cnt) {
    cnt.fillStyle = "#000";
    cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
    const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
    arrayToSort.forEach((element, index) => {
      if (index === this.currentMinimumIndex + this.doneIndex) {
        cnt.fillStyle = "#5255eb";
      } else {
        if (index < this.doneIndex) {
          cnt.fillStyle = "#55b809";
        } else {
          cnt.fillStyle = "#ffffff";
        }
      }
      cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.95, cnt.canvas.height * element);
    });
  }
}
