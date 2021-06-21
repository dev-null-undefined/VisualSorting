// Stalin Sort
class StalinSort extends Sort {
  constructor() {
    super();
    this.index = 0;
  }
  step() {
    if (getValue(arrayToSort, this.index, false) <= getValue(arrayToSort, this.index + 1)) {
      this.index++;
    } else {
      deleteOnIndex(this.index + 1);
    }
    return this.index === arrayToSort.length - 1;
  }
  draw(cnt) {
    cnt.fillStyle = "#000";
    cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
    const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
    arrayToSort.forEach((element, index) => {
      if (index <= this.index) {
        cnt.fillStyle = "#55b809";
      } else {
        cnt.fillStyle = getColorBasedOnValue(element);
      }
      cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.95, cnt.canvas.height * element);
    });
  }
}
