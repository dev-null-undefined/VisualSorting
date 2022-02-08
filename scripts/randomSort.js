// RandomSort
class RandomSort extends Sort {
    constructor() {
        super();
    }

    step() {
        arrayToSort = randomizePositions(arrayToSort);
        if (isSorted(arrayToSort)) {
            return true;
        }
    }

    draw(cnt) {
        cnt.fillStyle = "#000";
        cnt.fillRect(0, 0, cnt.canvas.width, cnt.canvas.height);
        const sizeOfBlock = cnt.canvas.width / arrayToSort.length;
        const sortedArray = [...arrayToSort].sort();
        arrayToSort.forEach((element, index) => {
            if (element === sortedArray[index]) {
                cnt.fillStyle = "#55b809";
            } else {
                cnt.fillStyle = "#e01f1f";
            }
            cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.99, cnt.canvas.height * element);
        });
    }
    static sound(){
        return false;
    }
}
