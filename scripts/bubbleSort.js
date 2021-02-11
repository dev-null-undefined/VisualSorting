// Buble sort variables
class BubbleSort extends Sort {
  constructor() {
    super();
    this.current = 0;
    this.loop = 0;
  }
  step() {
    if (this.current + this.loop >= arrayToSort.length - 1) {
      if (this.current === 0) {
        this.current = -1;
        this.loop++;
        return true;
      } else {
        this.current = 0;
        this.loop++;
      }
    } else {
      if (getValue(arrayToSort, this.current) > getValue(arrayToSort, this.current + 1)) {
        swap(this.current, this.current + 1, arrayToSort);
      }
      this.current++;
    }
  }
  draw(cnt) {
    cnt.fillStyle = "#000";
    cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
    const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
    arrayToSort.forEach((element, index) => {
      if (index === this.current || index === this.current + 1) {
        cnt.fillStyle = "#5255eb";
      } else if (index >= arrayToSort.length - this.loop) {
        cnt.fillStyle = "#55b809";
      } else {
        cnt.fillStyle = "#ffffff";
      }
      cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.95, cnt.canvas.height * element);
    });
  }
}
