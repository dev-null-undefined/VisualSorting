// Selection sort
class SelectionSort extends Sort {
    constructor() {
        super();
        this.doneIndex = 0;
        this.currentIndex = 0;
        this.minimumIndex = 0;
        this.minimumValue = getValue(arrayToSort, this.minimumIndex,false);
    }

    step() {
        if (this.currentIndex === arrayToSort.length) {
            swap(this.doneIndex, this.minimumIndex, arrayToSort);
            this.doneIndex++;
            this.currentIndex = this.doneIndex;
            this.minimumIndex = this.currentIndex;
            this.minimumValue = getValue(arrayToSort, this.minimumIndex);
        }
        const currentValue=getValue(arrayToSort,this.currentIndex);
        if (currentValue < this.minimumValue) {
            this.minimumIndex = this.currentIndex;
            this.minimumValue = currentValue;
        }
        this.currentIndex++;
        return this.doneIndex === arrayToSort.length - 1;
    }

    draw(cnt) {
        cnt.fillStyle = "#000";
        cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
        const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
        arrayToSort.forEach((element, index) => {
            if (index === this.minimumIndex) {
                cnt.fillStyle = "#5255eb";
            } else if (index < this.doneIndex) {
                cnt.fillStyle = "#55b809";
            } else if (index === this.currentIndex) {
                cnt.fillStyle = "#FF0";
            } else {
                cnt.fillStyle = getColorBasedOnValue(element);
            }

            cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.99, cnt.canvas.height * element);
        });
    }
}
