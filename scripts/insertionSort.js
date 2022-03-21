// Insertion Sort
class InsertionSort extends Sort {
    constructor() {
        super();
        this.done = 0;
        this.comparing = 0;
        this.low = 0;
        this.high = 0;
    }

    step() {
        if (this.done === arrayToSort.length) {
            return true;
        }

        if (this.low >= this.high) {
            move(this.done, this.low, arrayToSort);
            this.done++;
            this.low = 0;
            this.high = this.done;
            return false;
        }

        const mid = Math.floor((this.low + this.high) / 2);
        let value = getValue(arrayToSort, mid);
        let compare = getValue(arrayToSort, this.done, false);
        if (compare < value) {
            this.high = mid;
        } else if (compare > value) {
            this.low = mid + 1;
        } else {
            this.low = mid;
            this.high = mid;
        }
        return false;
    }

    draw(cnt) {
        cnt.fillStyle = "#000";
        cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
        const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
        arrayToSort.forEach((element, index) => {
            cnt.fillStyle = "#c6d618";
            cnt.fillRect((this.high+1) * sizeOfBlock, 0, 1, cnt.canvas.height);
            cnt.fillStyle = "#d6a318";
            cnt.fillRect(this.low * sizeOfBlock, 0, 1, cnt.canvas.height);

            if (index === this.done) {
                cnt.fillStyle = "#0e66c9";
            }else if(index === this.low && index === this.high){
                cnt.fillStyle = "#c54816";
            } else if (index === this.low) {
                cnt.fillStyle = "#c6d618";
            } else if (index === this.high) {
                cnt.fillStyle = "#d6a318";
            } else if (index < this.done) {
                cnt.fillStyle = "#35d618";
            } else {
                cnt.fillStyle = getColorBasedOnValue(element);
            }
            cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.05, 0, sizeOfBlock * 0.99, cnt.canvas.height * element);
        });
    }
}
