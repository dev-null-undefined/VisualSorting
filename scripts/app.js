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

const cnt = canvas.getContext("2d");
cnt.font = "30px Arial";

function generateArrayAndDraw(event) {
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
      stopOscilator();
      startButton.innerText = "Start sorting";
      startButton.className = "startButton";
      generateButton.disabled = false;
      sizeSlider.disabled = false;
    } else {
      if (oscillator == undefined) {
        createOscilator();
      }
      isDoneSorting = false;
      if (sortIndex != "7") {
        resumeOscilator();
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
  if (sortIndex == "7" && value != "7" && sortingTimeout) {
    resumeOscilator();
  }
  switch (value) {
    case "1":
      sortMethod = new TimSort();
      break;
    case "2":
      sortMethod = new InsertionSort();
      break;
    case "3":
      sortMethod = new SelectionSort();
      break;
    case "4":
      sortMethod = new QuickSort();
      break;
    case "5":
      sortMethod = new MergeSort();
      break;
    case "6":
      sortMethod = new BubbleSort();
      break;
    case "7":
      if (oscillator) {
        stopOscilator();
      }
      sortMethod = new RandomSort();
      break;
    case "8":
      sortMethod = new StalinSort();
      break;
    case "9":
      sortMethod = new LSDRadixSort();
      break;
    default:
      alert("Something went wrong pls report this to admin@debianserver.cz error-1:" + value);
      break;
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
