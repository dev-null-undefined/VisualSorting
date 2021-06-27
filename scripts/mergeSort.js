// Marge Sort
class MergeSort extends Sort {
    constructor() {
        super();
        this.currentHead = null;
        this.partAPointer = null;
        this.partBPointer = null;
        this.mainPart = new MargeSortPart(0, arrayToSort.length - 1, null);
        MergeSort.makePartsMargeSort(this.mainPart);
    }

    static makePartsMargeSort(part) {
        if (part.size() >= 1) {
            let subPart = new MargeSortPart(part.a, part.a + Math.floor(part.size() / 2), part);
            part.subParts.push(subPart);
            MergeSort.makePartsMargeSort(subPart);
            subPart = new MargeSortPart(part.a + Math.floor(part.size() / 2) + 1, part.b, part);
            part.subParts.push(subPart);
            MergeSort.makePartsMargeSort(subPart);
        } else {
            part.sorted = true;
        }
    }

    step() {
        if (!this.currentHead) {
            this.currentHead = this.mainPart;
            while (this.currentHead.subParts.length >= 2) {
                this.currentHead = this.currentHead.subParts[0];
            }
            this.currentHead = this.currentHead.head;
        } else if (this.partBPointer === null) {
            this.partAPointer = this.currentHead.subParts[0].a;
            this.partBPointer = this.currentHead.subParts[1].a;
        } else if (
            this.partBPointer > this.currentHead.subParts[1].b ||
            this.partAPointer > this.currentHead.subParts[1].b ||
            this.partAPointer >= arrayToSort.length ||
            this.partBPointer >= arrayToSort.length
        ) {
            this.partBPointer = null;
            this.currentHead.sorted = true;
            if (this.currentHead.head) {
                this.currentHead = this.currentHead.head;
                while (this.currentHead.subParts[1] || this.currentHead.subParts[0]) {
                    if (this.currentHead.subParts[0] && !this.currentHead.subParts[0].sorted) {
                        this.currentHead = this.currentHead.subParts[0];
                    } else if (this.currentHead.subParts[1] && !this.currentHead.subParts[1].sorted) {
                        this.currentHead = this.currentHead.subParts[1];
                    } else {
                        break;
                    }
                }
            } else {
                return true;
            }
        } else if (getValue(arrayToSort, this.partAPointer, false) < getValue(arrayToSort, this.partBPointer)) {
            this.partAPointer++;
        } else {
            move(this.partBPointer, this.partAPointer, arrayToSort);
            this.partBPointer++;
        }
    }

    draw(cnt) {
        cnt.fillStyle = "#000";
        cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
        const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
        arrayToSort.forEach((element, index) => {
            if (index === this.partAPointer) {
                cnt.fillStyle = "#ff0000";
            } else if (index === this.partBPointer) {
                cnt.fillStyle = "#c6d618";
            } else {
                cnt.fillStyle = getColorBasedOnValue(element);
            }
            cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.99, cnt.canvas.height * element);
        });
        cnt.fillStyle = "#ff0000";
        if (this.currentHead) {
            cnt.fillRect(this.currentHead.a * sizeOfBlock, 0, 1, cnt.canvas.height);
            cnt.fillRect((this.currentHead.b + 1) * sizeOfBlock - 1, 0, 1, cnt.canvas.height);
        }
    }
}

class MargeSortPart {
    constructor(a, b, head) {
        this.a = a;
        this.b = b;
        this.head = head;
        this.subParts = [];
        if (a > b) {
            console.log(this.size());
        }
        this.sorted = false;
    }

    size() {
        return this.b - this.a;
    }
}
