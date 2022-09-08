import { useState, useEffect } from "react";
import "../css/Home.css";
import {
  mergeSort,
  quickSortAnimations,
  bubbleSort,
  heapSort,
} from "../js/Algorithms";

//Colors
const PRIMARY_COLOR = "#e76f51"; //Orange
const SECONDARY_COLOR = "#264653"; //Blueish
const TERTIARY_COLOR = "#e9c46a"; //Yellowish

//Array Length
const ARRAY_LENGTH = 100;

//Animation Speed
const ANIMATION_SPEED_MS = 5;

export default function Home() {
  const [array, setArray] = useState();
  const [arrayLenth, setArrayLenth] = useState(ARRAY_LENGTH);

  useEffect(() => {
    newArray({ setArray, arrayLenth });
  }, []);

  return (
    <div className="main-container">
      <header>
        <nav>
          <ul className="nav_links">
            <li>
              <button
                className="new-array"
                onClick={() => newArray({ setArray, arrayLenth })}
              >
                Generate New Array
              </button>
            </li>
            <li>
              <button onClick={() => getMergeSortAnimations(array)}>
                Merge Sort
              </button>
            </li>
            <li>
              <button onClick={() => getQuickSortAnimations(array)}>
                Quick Sort
              </button>
            </li>
            <li>
              <button onClick={() => getBubbleSortAnimations(array)}>
                Bubble Sort
              </button>
            </li>
            <li>
              <button onClick={() => getHeapSortAnimations(array)}>
                Heap Sort
              </button>
            </li>
            <li>
              <button>Bucket Sort</button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="body-container">
        <div className="array-container">
          {array?.map((element, index) => {
            return (
              <div
                className="array-bar"
                key={index}
                style={{
                  height: `${(element * 20) / 100}%`,
                  backgroundColor: PRIMARY_COLOR,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

//Merge Sort animations and algorithm call
function getMergeSortAnimations(array) {
  const animations = mergeSort(array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("array-bar");
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${(newHeight * 20) / 100}%`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}

//Quick sort animations and algorithm call
function getQuickSortAnimations(array) {
  const animations = quickSortAnimations(array);
  let currentPivot = null;
  let prevPivot = null;
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("array-bar");
    const [type, barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] =
      animations[i];

    switch (type) {
      case "pivot":
        currentPivot = barOneIdx;
        const currentPivotStyle = arrayBars[currentPivot].style;

        if (prevPivot !== currentPivot && prevPivot !== null) {
          const prevPivotStyle = arrayBars[prevPivot].style;

          setTimeout(() => {
            prevPivotStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
        setTimeout(() => {
          currentPivotStyle.backgroundColor = TERTIARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        prevPivot = currentPivot;
        continue;
      case "first":
        const firstOneStyle = arrayBars[barOneIdx].style;
        const firstTwoStyle = arrayBars[barTwoIdx].style;

        setTimeout(() => {
          firstOneStyle.backgroundColor = SECONDARY_COLOR;
          firstTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        continue;
      case "second":
        const secondOneStyle = arrayBars[barOneIdx].style;
        const secondTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          secondOneStyle.height = `${(barOneHeight * 20) / 100}%`;
          secondTwoStyle.height = `${(barTwoHeight * 20) / 100}%`;
        }, i * ANIMATION_SPEED_MS);

        setTimeout(() => {
          secondOneStyle.backgroundColor = PRIMARY_COLOR;
          secondTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        continue;
    }
  }
}

//Bubble sort animations and algorithm call
function getBubbleSortAnimations(array) {
  const animations = bubbleSort(array);

  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("array-bar");
    const [type, barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] =
      animations[i];

    switch (type) {
      case 1:
        setTimeout(() => {
          if (barTwoIdx >= ARRAY_LENGTH) {
            const initTwoStyle = arrayBars[barTwoIdx - 1].style;
            initTwoStyle.backgroundColor = SECONDARY_COLOR;
          } else {
            const initTwoStyle = arrayBars[barTwoIdx].style;
            initTwoStyle.backgroundColor = SECONDARY_COLOR;
          }
          const initOneStyle = arrayBars[barOneIdx].style;
          initOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        continue;
      case 2:
        setTimeout(() => {
          if (barTwoIdx >= ARRAY_LENGTH) {
            const secondTwoStyle = arrayBars[barTwoIdx - 1].style;
            secondTwoStyle.backgroundColor = TERTIARY_COLOR;
          } else {
            const secondTwoStyle = arrayBars[barTwoIdx].style;
            secondTwoStyle.backgroundColor = TERTIARY_COLOR;
          }
          const secondOneStyle = arrayBars[barOneIdx].style;
          secondOneStyle.backgroundColor = TERTIARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        continue;
      case 3:
        setTimeout(() => {
          if (barTwoIdx >= ARRAY_LENGTH) {
            const secondTwoStyle = arrayBars[barTwoIdx - 1].style;
            secondTwoStyle.backgroundColor = SECONDARY_COLOR;
            secondTwoStyle.height = `${(barTwoHeight * 20) / 100}%`;
          } else {
            const secondTwoStyle = arrayBars[barTwoIdx].style;
            secondTwoStyle.backgroundColor = SECONDARY_COLOR;
            secondTwoStyle.height = `${(barTwoHeight * 20) / 100}%`;
          }
          const secondOneStyle = arrayBars[barOneIdx].style;
          secondOneStyle.backgroundColor = SECONDARY_COLOR;
          secondOneStyle.height = `${(barOneHeight * 20) / 100}%`;
        }, i * ANIMATION_SPEED_MS);
        continue;
      case 4:
        setTimeout(() => {
          if (barTwoIdx >= ARRAY_LENGTH) {
            const finalTwoStyle = arrayBars[barTwoIdx - 1].style;
            finalTwoStyle.backgroundColor = PRIMARY_COLOR;
          } else {
            const finalTwoStyle = arrayBars[barTwoIdx].style;
            finalTwoStyle.backgroundColor = PRIMARY_COLOR;
          }
          const finalOneStyle = arrayBars[barOneIdx].style;
          finalOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        continue;
    }
  }
}

//Heap sort animations and algorithm call
function getHeapSortAnimations(array) {
  const animations = heapSort(array);
  console.log(animations);
}

function newArray({ setArray, arrayLenth }) {
  var newArray = [];
  for (let i = 0; i < arrayLenth; i++) {
    const number = Math.floor(Math.random() * 499) + 1;
    newArray.push(number);
  }
  setArray(newArray);
}
