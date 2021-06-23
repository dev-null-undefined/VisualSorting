// Quick Sort
class QuickSort extends Sort {
  constructor() {
    super();
    this.parts = [];
    this.done = [];
    this.parts.push(new Part(0, arrayToSort.length - 1));
  }
  step() {
    if (!this.currentPart) {
      if (this.parts.length === 0) {
        return true;
      }
      this.currentPart = this.parts.pop();
      if (this.currentPart.a === this.currentPart.b) {
        return true;
      } else {
        this.currentPivot = this.currentPart.a + Math.floor(Math.random() * (this.currentPart.b - this.currentPart.a));
      }
    } else {
      if (!this.current) {
        this.current = this.currentPart.a + 1;
        swap(this.currentPivot, this.currentPart.a, arrayToSort);
        this.currentPivot = this.currentPart.a;
        this.smaller = this.currentPart.a;
      } else {
        if (this.current > this.currentPart.b) {
          swap(this.smaller, this.currentPart.a, arrayToSort);
          this.done.push(this.smaller);
          // add some code
          if (this.currentPart.a < this.smaller - 1) {
            this.parts.push(new Part(this.currentPart.a, this.smaller - 1));
          } else if (this.currentPart.a === this.smaller - 1) {
            this.done.push(this.currentPart.a);
          }
          if (this.smaller + 1 < this.currentPart.b) {
            this.parts.push(new Part(this.smaller + 1, this.currentPart.b));
          } else if (this.smaller + 1 === this.currentPart.b) {
            this.done.push(this.currentPart.b);
          }
          this.currentPart = null;
          this.current = null;
        } else {
          if (getValue(arrayToSort, this.current) < getValue(arrayToSort, this.currentPivot, false)) {
            swap(++this.smaller, this.current++, arrayToSort);
          } else {
            this.current++;
          }
        }
      }
    }
  }
  draw(cnt) {
    cnt.fillStyle = "#000";
    cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
    const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
    arrayToSort.forEach((element, index) => {
      if (this.currentPivot === index) {
        cnt.fillStyle = "#ff0000";
      } else if (this.done.indexOf(index) >= 0) {
        cnt.fillStyle = "#55b809";
      } else if (index === this.current) {
        cnt.fillStyle = "#08c7d1";
      } else if (this.currentPart && this.currentPart.contains(index) && index <= this.smaller) {
        cnt.fillStyle = "#fcd303";
      } else {
        cnt.fillStyle = getColorBasedOnValue(element);
      }
      cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.99, cnt.canvas.height * element);
    });
    cnt.fillStyle = "#ff0000";
    cnt.strokeStyle = "#FF0000";
    cnt.setLineDash([5, 3]);
    cnt.beginPath();
    cnt.moveTo(0, cnt.canvas.height * arrayToSort[this.currentPivot]);
    cnt.lineTo(cnt.canvas.width, cnt.canvas.height * arrayToSort[this.currentPivot]);
    cnt.stroke();
    if (this.currentPart) {
      cnt.fillRect(this.currentPart.a * sizeOfBlock, 0, 1, cnt.canvas.height);
      cnt.fillRect((this.currentPart.b + 1) * sizeOfBlock - 1, 0, 1, cnt.canvas.height);
    }
  }
}
