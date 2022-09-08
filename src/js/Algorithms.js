function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

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

//
// Heap Sort
//
export function heapSort(array) {
  console.log(array);
  const animations = [];
  let length = array.length;
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    max_heapify(array, i, length, animations); //Build max heap
  }
  for (let i = length - 1; i >= 0; i--) {
    swap(array, 0, i); //Remove root element
    max_heapify(array, 0, i, animations); //Build max heap again
  }
  return animations;
}

//Creates max-heap from unsorted array (Max Heap parentNodes > childNodes)
function max_heapify(array, index, length, animations) {
  let startIndex = 2 * index; //startIndex child index
  let endIndex = 2 * index + 1; //endIndex child index
  let max;

  if (endIndex < length) {
    //endIndex child exists?
    if (array[startIndex] >= array[endIndex]) {
      //compare children to find max
      max = startIndex;
    } else {
      max = endIndex;
    }
  } else if (startIndex < length) {
    //startIndex child exists?
    max = startIndex;
  } else {
    return; //no children -> return
  }
  animations.push([array[max], ""]);
  if (array[index] < array[max]) {
    //check if the largest child is greater than the parent
    animations.push([index, max]);
    swap(array, index, max); //it is? Swap both!
    max_heapify(array, max, length, animations); //Repeat
  }
}
