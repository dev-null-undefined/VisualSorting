// MSD Radix Sort
class MSDRadixSort extends Sort {
    constructor() {
        super();
        this.currentDigit = 2;
        this.position = 0;
        this.index = 0;
        this.digit = 0;
        this.layers = [];
        for (let i = 0; i < 19; i++) {
            this.layers[i + 2] = [];
        }
        this.currentPart = new Part(0, null);
        this.workingPart = new Part(0, arrayToSort.length);
    }

    step() {
        if (this.currentDigit + 1 === 20) {
            return true;
        }
        if (this.index >= this.workingPart.b) {
            this.currentPart.b = this.position;
            if (this.currentPart.size() > 1) {
                this.layers[this.currentDigit + 1].push(this.currentPart);
            }
            this.currentPart = new Part(this.position, null);
            this.digit++;
            this.index = this.position;
        }
        if (this.digit > 9 || this.position >= this.workingPart.b) {
            this.digit = 0;
            while (this.layers[this.currentDigit].length === 0) {
                if (this.layers[++this.currentDigit] === undefined) {
                    return true;
                }
            }
            this.workingPart = this.layers[this.currentDigit].shift();
            this.index = this.workingPart.a;
            this.position = this.workingPart.a;
            this.currentPart = new Part(this.position, null);
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
        if (this.workingPart) {
            let digitBefore = Math.floor(arrayToSort[this.currentPart.a] * Math.pow(10, this.currentDigit - 2));
            digitBefore /= Math.pow(10, this.currentDigit - 2);
            let currentDigit = (1 / Math.pow(10, this.currentDigit - 1));

            cnt.fillStyle = "#f00";
            cnt.fillRect(
                0,
                cnt.canvas.height * (currentDigit * this.digit + digitBefore),
                cnt.canvas.width,
                1
            );
            cnt.fillRect(
                0,
                cnt.canvas.height * (currentDigit * (this.digit + 1) + digitBefore),
                cnt.canvas.width,
                1
            );

            cnt.fillStyle = "#0F0";
            cnt.fillRect(
                0,
                cnt.canvas.height * digitBefore,
                cnt.canvas.width,
                1
            );
            cnt.fillRect(
                0,
                cnt.canvas.height * (digitBefore + 1 / Math.pow(10, this.currentDigit - 2)),
                cnt.canvas.width,
                1
            );

            cnt.fillStyle = "#AFA";
            cnt.fillRect(this.workingPart.a * sizeOfBlock, 0, 1, cnt.canvas.height);
            cnt.fillRect((this.workingPart.b) * sizeOfBlock - 1, 0, 1, cnt.canvas.height);
        }
    }
}
