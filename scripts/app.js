let sortingTimeout = null;
let isDoneSorting = false;
let sortMethod = null;
let sortIndex = null;

let arrayToSort = [];
let arrayToSortAccess = 0;
let arrayToSortModifications = 0;

const speedSlider = document.getElementById("speed");
const sizeSlider = document.getElementById("arraySize");
const generateButton = document.getElementById("generator");
const startButton = document.getElementById("startButton");
const sizeSliderInfo = document.getElementById("arraySizeText");
const speedSliderInfo = document.getElementById("speedText");

const canvas = document.getElementById("canvas");
let width = window.innerWidth * 0.8;
let height = window.innerHeight - 250;
canvas.width = width;
canvas.height = height;


let isDrawing = false;
let lastPositionX = null;
canvas.addEventListener('mousemove', e => {
    if (isDrawing && sortingTimeout === null) {
        saveValue(e.offsetX, e.offsetY, lastPositionX);
    }
    lastPositionX = e.offsetX;
});
window.addEventListener('mousedown', () => {
    isDrawing = true;
});
window.addEventListener('mouseup', () => {
    isDrawing = false;
    lastPositionX = null;
});

function saveValue(x1, y1, x2) {
    x1 = Math.max(Math.min(width, x1), 0)
    if (x2 == null) {
        x2 = x1
    } else {
        x2 = Math.max(Math.min(width, x2), 0)
    }
    y1 = Math.max(Math.min(height, y1), 0)

    let index1 = Math.min(Math.floor((x1 / width) * sizeSlider.value), sizeSlider.value - 1)
    let index2 = Math.min(Math.floor((x2 / width) * sizeSlider.value), sizeSlider.value - 1);
    if (index1 > index2) {
        let saveValue = index1;
        index1 = index2;
        index2 = saveValue;
    }
    let value = y1 / height;
    for (; index1 <= index2; index1++) {
        arrayToSort[index1] = value;
    }
    draw()
    if (sortIndex != null) {
        updateSortMethod(sortIndex);
    }
}


const cnt = canvas.getContext("2d");
cnt.font = "30px Arial";

function generateArrayAndDraw() {
    arrayToSort = generateArray(sizeSlider.value);
    if (sortIndex) {
        updateSortMethod(sortIndex);
    }
    draw();
}

// #region Adding event Listener
generateButton.addEventListener("click", generateArrayAndDraw);
startButton.addEventListener("click", switchSorting);
speedSlider.onchange = speedSliderOnChange;
sizeSlider.onchange = sizeSliderOnChange;
speedSlider.oninput = speedSliderOnChange;
sizeSlider.oninput = sizeSliderOnChange;

function sizeSliderOnChange(event) {
    generateArrayAndDraw();
    if (sortIndex) {
        updateSortMethod(sortIndex);
    }
    sizeSliderInfo.innerText = "Array size: " + event.target.value;
}

function speedSliderOnChange(event) {
    speedSliderInfo.innerText = "Speed: " + event.target.value;
}

window.onresize = windowsResize;

function windowsResize() {
    width = window.innerWidth * 0.8;
    height = window.innerHeight - 250;
    canvas.width = width;
    canvas.height = height;
    draw();
}

// #endregion

function switchSorting() {
    if (sortMethod) {
        if (sortingTimeout) {
            // Stop
            clearTimeout(sortingTimeout);
            sortingTimeout = null;
            oscillator.stop();
            startButton.innerText = "Start sorting";
            startButton.className = "startButton";
            generateButton.disabled = false;
            sizeSlider.disabled = false;
        } else {
            isDoneSorting = false;
            if (sortMethod.constructor.sound()) {
                oscillator.resume();
            }
            startButton.innerText = "Stop sorting";
            startButton.className = "stopButton";
            generateButton.disabled = true;
            sizeSlider.disabled = true;
            sortingRecursion();
        }
    } else {
        alert("Chose the Sort method");
    }
}

function sortingRecursion() {
    if (!isDoneSorting) {
        let sortStep = sortMethod.step();
        if (sortStep) {
            sortMethod = new SortChecking();
            isDoneSorting = true;
        }
    } else {
        if (sortMethod.step()) {
            updateSortMethod(sortIndex);
            switchSorting();
            return;
        }
    }
    sortMethod.draw(cnt);
    cnt.fillStyle = "#FFF";
    cnt.font = "25px sans-serif";
    cnt.fillText("Access:" + arrayToSortAccess * 2, 0, canvas.height);
    cnt.fillText("Modify:" + arrayToSortModifications, 0, canvas.height - 25);
    sortingTimeout = setTimeout(sortingRecursion, (speedSlider.min + (speedSlider.max - speedSlider.value)) * 5);
}

function updateSortMethod(value) {
    arrayToSortAccess = 0;
    arrayToSortModifications = 0;
    isDoneSorting = false;
    let sortClass = sortsDictionary[value];
    if (sortClass === undefined) {
        alert("Something went wrong pls report this to admin@debianserver.cz error-1:" + value);
        return;
    }
    sortMethod = new sortClass();

    if (!sortClass.sound()) {
        oscillator.stop();
    } else if (sortsDictionary[sortIndex] !== undefined && !sortsDictionary[sortIndex].sound() && sortingTimeout) {
        oscillator.resume();
    }
    sortIndex = value;
}

function draw() {
    cnt.fillStyle = "#000";
    cnt.fillRect(0, 0, width, height);
    const sizeOfBlock = width / arrayToSort.length;
    arrayToSort.forEach((element, index) => {
        cnt.fillStyle = getColorBasedOnValue(element);
        cnt.fillRect(index * sizeOfBlock + sizeOfBlock * 0.025, 0, sizeOfBlock * 0.99, height * element);
    });
}

generateArrayAndDraw();
