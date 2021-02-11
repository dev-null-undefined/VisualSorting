// Array Functions
function randomizePositions(array, timesToSwap = array.length) {
  for (let i = 0; i < array.length; i++) {
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
  if (a != b) {
    arrayToSortModifications++;
  }
}
function move(indexA, indexB, array) {
  if (indexA != indexB) {
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

function getValue(array, index) {
  changeFrequency(array[index]);
  arrayToSortAccess++;
  return array[index];
}
function getValue(array, index, audio = true) {
  if (audio) changeFrequency(array[index]);
  arrayToSortAccess++;
  return array[index];
}

function deleteOnIndex(index) {
  arrayToSortModifications++;
  arrayToSort.splice(index, 1);
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
