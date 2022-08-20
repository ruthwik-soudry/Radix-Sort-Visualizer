import React from 'react';
import { getRadixSortAnimations } from '../sortingAlgorithms/RadixSort';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 5;

const NUMBER_OF_ARRAY_BARS = 100;

const PRIMARY_COLOR = 'pink';

const SECONDARY_COLOR = 'purple';

const algorithms = {
  "radixSort": getRadixSortAnimations
}

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 650));
    }
    this.setState({ array });
  }

  disableSortButtons() {
    document.getElementById("generateNewArray").disabled = true;
    document.getElementById("radixSort").disabled = true;
  }

  restoreStoreButtons() {
    document.getElementById("generateNewArray").disabled = false;
    document.getElementById("radixSort").disabled = false;
  }


  //dont delete this

  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const mergeSortedArray = getMergeSortAnimations(array.slice());
  //     // console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
  //   }
  // }

  bktsort(algorithmName) {
    this.disableSortButtons();
    const [animations, sortArray] = algorithms[algorithmName](this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [comparision, barOneIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
      else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => this.restoreStoreButtons(), (animations.length - 1) * ANIMATION_SPEED_MS);
  }


  sort(algorithmName) {
    this.disableSortButtons();
    const [animations, sortArray] = algorithms[algorithmName](this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
      else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => this.restoreStoreButtons(), (animations.length - 1) * ANIMATION_SPEED_MS);
  }

  //try to check random generator in the end
  //  random_bg_color() {
  //   let x = Math.floor(Math.random() * 256);
  //   let y = Math.floor(Math.random() * 256);
  //   let z = Math.floor(Math.random() * 256);
  //   let bgColor = "rgb(" + x + "," + y + "," + z + ")";
  //   return bgColor
  //   }

  render() {
    const { array } = this.state;
    //trying to generate random colors
    // const bgRand = this.random_bg_color()


    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}>

        </div>
        ))}

        <button id="generateNewArray" style={{ marginRight: '8px' }} onClick={() => this.resetArray()}>Generate New Array</button>
        <button id="radixSort" style={{ marginRight: '8px' }} onClick={() => this.bktsort('radixSort')}>Radix Sort</button>
      </div>

    );

  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// dont delete this
// function arraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;
//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) {
//       return false;
//     }
//   }
//   return true;
// }