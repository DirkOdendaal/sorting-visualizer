//
//Merge Sort
//
export function mergeSort(array) {
  //Base case if array is larger or eq to 1
  if (array.length <= 1) return array;

  const animations = [];
  const auxArray = array.slice();
  mergeHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
}

function mergeHelper(mainArray, startIndex, endIndex, auxArray, animations) {
  //Reterun when array end is reached
  if (startIndex === endIndex) return;

  //Middle index of new array
  const middleIndex = Math.floor((startIndex + endIndex) / 2);

  //First Half of new array
  mergeHelper(auxArray, startIndex, middleIndex, mainArray, animations);
  //Second Half of new array
  mergeHelper(auxArray, middleIndex + 1, endIndex, mainArray, animations);
  mergeFunction(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxArray,
    animations
  );
}

function mergeFunction(
  mainArray,
  startIndex,
  middleIndex,
  endIndex,
  auxArray,
  animations
) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;

  while (i <= middleIndex && j <= endIndex) {
    //Insert indexes twice for initial color change and change back to primary
    animations.push([i, j]);
    animations.push([i, j]);

    //test value at index if smaller or larger
    if (auxArray[i] <= auxArray[j]) {
      //Overwrite value in original array to value at index i in auxArray
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      //Overwrite value in original array to value at index j in auxArray
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }
  while (i <= middleIndex) {
    //Insert indexes twice for initial color change and change back to primary
    animations.push([i, i]);
    animations.push([i, i]);

    //Overwrite value in original array to value at index i in auxArray
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }
  while (j <= endIndex) {
    //Insert indexes twice for initial color change and change back to primary
    animations.push([j, j]);
    animations.push([j, j]);

    //Overwrite value in original array to value at index j in auxArray
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}

//
// Quick Sort
//
export function quickSortAnimations(array) {
  const animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(items, left, right, animations) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, animations); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1, animations);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right, animations);
    }
  }
  return items;
}

function partition(items, left, right, animations) {
  animations.push(["pivot", Math.floor((right + left) / 2), ""]);
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      // console.log("Element smaller than pivot");
      i++;
    }
    while (items[j] > pivot) {
      // console.log("Element larger than pivot");
      j--;
    }
    if (i <= j) {
      //Swapping two elements
      animations.push(["first", i, j, items[i], items[j]]);
      animations.push(["first", i, j, items[i], items[j]]);
      swap(items, i, j, animations);
      animations.push(["second", i, j, items[i], items[j]]);
      animations.push(["second", i, j, items[i], items[j]]);

      i++;
      j--;
    }
  }
  return i;
}

function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

//
// Bubble Sort
//

export function bubbleSort(array) {
  const animations = [];
  var i, j;
  const len = array.length;

  var isSwapped = false;

  for (i = 0; i < len; i++) {
    isSwapped = false;

    for (j = 0; j < len; j++) {
      //Comparing these two elements need to push animation
      if (array[j] > array[j + 1]) {
        animations.push([1, j, j + 1, "", ""]);
        animations.push([2, j, j + 1, "", ""]);
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        animations.push([3, j, j + 1, array[j], array[j + 1]]);
        animations.push([4, j, j + 1, "", ""]);
        isSwapped = true;
      }
    }

    // If no two elements were swapped by inner loop, then break

    if (!isSwapped) {
      break;
    }
  }

  return animations;
}
