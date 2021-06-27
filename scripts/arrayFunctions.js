// Array Functions
function randomizePositions(array, timesToSwap = array.length) {
  for (let i = 0; i < timesToSwap; i++) {
    swap(Math.floor(Math.random() * array.length), Math.floor(Math.random() * array.length), array);
  }
  arrayToSortModifications += array.length;
  return array;
}
function isSorted(array) {
  const sortedArray = [...array].sort();
  let sorted = true;
  array.forEach((element, index) => {
    if (element !== sortedArray[index]) {
      sorted = false;
    }
  });
  return sorted;
}
function swap(a, b, array) {
  const itemA = array[a];
  array[a] = array[b];
  array[b] = itemA;
  if (a !== b) {
    arrayToSortModifications++;
  }
}
function move(indexA, indexB, array) {
  if (indexA !== indexB) {
    arrayToSortModifications++;
  }
  return array.splice(indexB, 0, array.splice(indexA, 1)[0]);
}
function generateArray(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.random());
  }
  return array;
}
function minIndex(array) {
  let minimumIndex = 0;
  array.forEach((element, index) => {
    if (element < getValue(array, minimumIndex)) {
      minimumIndex = index;
    }
  });
  return minimumIndex;
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function getValue(array, index, audio = true) {
  if (audio) osciallator.changeFrequency(array[index]);
  arrayToSortAccess++;
  return array[index];
}

function deleteOnIndex(index) {
  arrayToSortModifications++;
  arrayToSort.splice(index, 1);
}

function getColorBasedOnValue(value) {
  let red = Math.max(0, Math.sin((value - 0.4 * value) * Math.PI));
  let green = 1 - Math.pow(Math.max(0, Math.cos(value - 0.2)), 5);
  let blue = Math.sin(value * Math.PI * 2) / 6 + 0.5 - Math.pow(value, 5) / 2.5;
  return rgbToHex(red * 255, green * 255, blue * 255);
  // rainbow
  // return rgbToHex(
  //   Math.max(0, Math.sin(value * Math.PI + Math.PI / 2)) * 255,
  //   Math.max(0, Math.sin(value * Math.PI - Math.PI / 2)) * 255,
  //   Math.max(0, Math.sin(value * Math.PI)) * 255
  // );
}

function componentToHex(c) {
  let hex = Math.floor(c).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

class Part {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  contains(c) {
    return c >= this.a && c <= this.b;
  }

  size() {
    return this.b - this.a;
  }
}
