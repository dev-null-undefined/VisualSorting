// LSD Radix Sort
class LSDRadixSort extends Sort {
    constructor() {
        super();
        this.currentDigit = 17;
        this.position = 0;
        this.index = 0;
        this.digit = 0;
    }

    step() {
        if (this.index >= arrayToSort.length) {
            this.digit++;
            this.index = this.position;
        }
        if (this.digit > 9 || this.position >= arrayToSort.length) {
            this.digit = 0;
            this.index = 0;
            this.position = 0;
            this.currentDigit--;
            if (this.currentDigit === 1) {
                return true;
            }
        }
        if (getDigit(getValue(arrayToSort, this.index), this.currentDigit) == this.digit) {
            move(this.index, this.position, arrayToSort);
            this.position++;
        }
        this.index++;
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
