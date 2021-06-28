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
const sizeSliderText = document.getElementById("arraySizeText");
const speedSliderText = document.getElementById("speedText");

const canvas = document.getElementById("canvas");
let width = window.innerWidth * 0.8;
let height = window.innerHeight - 250;
canvas.width = width;
canvas.height = height;


let isDrawing = false;
let lastPosition = {x: null, y: null};
canvas.addEventListener('mousemove', e => {
    if (isDrawing && sortingTimeout === null) {
        saveValue(e.offsetX, e.offsetY, lastPosition.x, lastPosition.y);
    }
    lastPosition.x = e.offsetX;
    lastPosition.y = e.offsetY;
});
window.addEventListener('mousedown', () => {
    isDrawing = true;
});
window.addEventListener('mouseup', () => {
    isDrawing = false;
    lastPosition.x = null;
    lastPosition.y = null;
});

function saveValue(x1, y1, x2, y2) {
    x1 = Math.max(Math.min(width, x1), 0);
    if (x2 == null) {
        x2 = x1;
    } else {
        x2 = Math.max(Math.min(width, x2), 0);
    }

    y1 = Math.max(Math.min(height, y1), 0);
    if (y2 == null) {
        y2 = y1;
    } else {
        y2 = Math.max(Math.min(height, y2), 0);
    }

    let index1 = Math.min(Math.floor((x1 / width) * sizeSlider.value), sizeSlider.value - 1);
    let index2 = Math.min(Math.floor((x2 / width) * sizeSlider.value), sizeSlider.value - 1);
    if (index1 > index2) {
        let saveValue = index1;
        index1 = index2;
        index2 = saveValue;
        saveValue = y2;
        y2 = y1;
        y1 = saveValue;
    }

    if (index1 === index2) {
        arrayToSort[index1] = randomiseValue(y1 / height);
    } else {
        for (let i = index1; i <= index2; i++) {
            arrayToSort[i] = randomiseValue(map_range(i, index1, index2, y1, y2) / height);
        }
    }
    draw();
    if (sortIndex != null) {
        updateSortMethod(sortIndex);
    }
}

function randomiseValue(value, divider = 500) {
    return Math.max(0.0001, Math.min(0.999999, value + Math.random() / divider) - Math.random() / divider);
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
speedSliderText.onchange = speedSliderTextOnChange;
sizeSliderText.onchange = sizeSliderTextOnChange;

function sizeSliderOnChange() {
    generateArrayAndDraw();
    if (sortIndex) {
        updateSortMethod(sortIndex);
    }
    sizeSliderText.value = sizeSlider.value;
}

function speedSliderOnChange(event) {
    speedSliderText.value = event.target.value;
}

function speedSliderTextOnChange(event) {
    const value = parseFloat(event.target.value);
    if (value >= speedSlider.min && value <= speedSlider.max && speedSlider.value !== value) {
        speedSlider.value = value;
    }
    speedSliderText.value=speedSlider.value;
}

function sizeSliderTextOnChange(event) {
    const value = parseInt(event.target.value);
    if (value >= sizeSlider.min && value <= sizeSlider.max && sizeSlider.value !== value) {
        sizeSlider.value = value;
    }
    sizeSliderOnChange()
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
