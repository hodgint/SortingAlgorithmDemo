/************************************
 * File: sort.js
 * Name: Travis Hodgin
 * Desc: Calculates and displays
 *       several sorting algorithms
 ************************************/
var sort = (function() {
  /* Colors Hex codes */
  const DEFAULT_COLOR = "#777";
  const SWAP_COLOR = "#FF0000";
  const COMPARE_COLOR = "#008000";
  var timer = 0;
  let stillTiming = false;

  /*
   * Draws a border around the perimeter of the canvas
   * - canvas: DOM object for a canvas to draw on
   */
  function drawBorder(canvas) {
    let context = canvas.getContext("2d");
    context.strokeRect(0, 0, canvas.width, canvas.height);
  }
  /*
   * Draws boxes to display given array with
   * Colors given
   * Inputs:
   * - arr: an array of numbers
   * - canvas: DOM object for a canvas to draw on
   * - colors: array of strings. ith
   * element is the color of the ith element in arr.
   */
  function drawArray(arr, canvas, colors) {
    /* canvas setup */
    let context = canvas.getContext("2d");
    let width = 2;
    let size = arr.length;
    let spacing = canvas.width / (width * size + size + 1);
    let barWidth = spacing * width;

    context.clearRect(0, 0, canvas.width, canvas.height);
    /* find min/max */
    let min = arr[0];
    let max = arr[0];
    for (let i = 0; i < size; i++) {
      min = arr[i] < min ? arr[i] : min;
      max = arr[i] > max ? arr[i] : max;
    }

    /* utility function  to bounds y to between 0 and canvas height */
    function boundY(y) {
      let a = canvas.height / (min - max);
      let b = canvas.height / (max - min);
      return a * y + b;
    }

    let yZero = boundY(0);
    context.beginPath();
    context.moveTo(0, yZero);
    context.lineTo(canvas.width, yZero);
    context.stroke();

    /* canvas border */
    context.strokeRect(0, 0, canvas.width, canvas.height);

    /* draw boxes */
    let x = spacing;
    for (let i = 0; i < arr.length; i++) {
      context.fillStyle = colors[i];
      let y = boundY(arr[i]);
      context.fillRect(x, y, barWidth, yZero - y);
      x += spacing + barWidth;
    }
  }

  /*
   * Animates the boxes on the canvas
   * Inputs:
   * - arr: an array of numbers
   * - canvas: DOM object where we draw
   */
  function animateArr(arr, canvas, interval, timerObj) {
    this._arr = arr;
    this._canvas = canvas;
    this._displayArr = [];
    this._colors = [];
    this._actions = [];
    for (let i = 0; i < arr.length; i++) {
      this._displayArr.push(arr[i]);
      this._colors.push(DEFAULT_COLOR);
    }
    drawArray(this._arr, this._canvas, this._colors);
    let _this = this;
    timer = 0;
    this._id = window.setInterval(function() {
      _this._step();
    }, interval);

    /* Utility functions */
    animateArr.prototype.stop = function() {
      window.clearInterval(this._id);
    };
    animateArr.prototype.length = function() {
      return this._arr.length;
    };
    animateArr.prototype.swap = function(i, j) {
      this._actions.push(["swap", i, j]);
      let t = this._arr[i];
      this._arr[i] = this._arr[j];
      this._arr[j] = t;
    };
    animateArr.prototype.compare = function(i, j) {
      this._actions.push(["compare", i, j]);
      return this._arr[i] - this._arr[j];
    };
    animateArr.prototype.greaterThan = function(i, j) {
      return this.compare(i, j) > 0;
    };
    animateArr.prototype.lessThan = function(i, j) {
      return this.compare(i, j) < 0;
    };
    animateArr.prototype._step = function() {
      if (this._actions.length === 0) {
        drawArray(this._displayArr, this._canvas, this._colors);
        clearInterval(this._id);
        stillTiming = false;
        return;
      }
      stillTiming = true;
      timer = timer + interval;
      let action = this._actions.shift();
      let i = action[1];
      let j = action[2];
      if (action[0] === "swap") {
        this._colors[i] = SWAP_COLOR;
        this._colors[j] = SWAP_COLOR;
        let temp = this._displayArr[i];
        this._displayArr[i] = this._displayArr[j];
        this._displayArr[j] = temp;
      } else if (action[0] === "compare") {
        this._colors[i] = COMPARE_COLOR;
        this._colors[j] = COMPARE_COLOR;
      }
      drawArray(this._displayArr, this._canvas, this._colors);
      this._colors[i] = DEFAULT_COLOR;
      this._colors[j] = DEFAULT_COLOR;
    };
  }

  /*
   * Sorts given array using bubble sort
   * - arr: an array of numbers
   */
  function bubbleSort(arr) {
    let size = arr.length();
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        if (arr.lessThan(j + 1, j)) {
          arr.swap(j, j + 1);
        }
      }
    }
  }

  /*
   * Sorts given array using selection sort
   * - arr: an array of numbers
   */
  function selectionSort(arr) {
    let size = arr.length();
    for (let i = 0; i < size - 1; i++) {
      let minJ = i;
      for (let j = i; j < size; j++) {
        if (arr.lessThan(j, minJ)) {
          minJ = j;
        }
      }
      arr.swap(i, minJ);
    }
  }

  /*
   * Sorts given array using insertion sort
   * - arr: an array of numbers
   */
  function insertionSort(arr) {
    let size = arr.length();
    for (let i = 1; i < size; i++) {
      for (let j = i; j > 0 && arr.lessThan(j, j - 1); j--) {
        arr.swap(j, j - 1);
      }
    }
  }

  /*
   * checks for a valid permutation
   * - perm: list of permutations
   */
  function checkPerm(perm) {
    let size = perm.length;
    let used = {};
    for (let i = 0; i < size; i++) {
      if (used[perm[i]]) {
        return false;
      }
      used[perm[i]] = true;
    }
    for (let i = 0; i < size; i++) {
      if (!used[i]) {
        return false;
      }
    }
    return true;
  }

  /*
   * Permutation to list of transpositions
   * - perm: list of permutations
   */
  function permSwap(perm) {
    if (checkPerm(perm) === false) {
      throw " Invalid permutaion";
    }
    let size = perm.length;
    let used = [];
    for (let i = 0; i < size; i++) {
      used.push(false);
    }
    let trans = [];
    for (let i = 0; i < size; i++) {
      if (used[i]) continue;
      let curr = i;
      if (perm[i] == i) {
        used[i] = true;
      }
      while (!used[perm[curr]]) {
        trans.push([curr, perm[curr]]);
        used[curr] = true;
        curr = perm[curr];
      }
    }
    return trans;
  }

  /*
   * Sorts given array using merge sort
   * - arr: an array of numbers
   * - left: left index of the given array
   * - right: right index of the given array
   */
  function mergeSort(arr, left, right) {
    if (typeof left === "undefined") {
      left = 0;
    }
    if (typeof right === "undefined") {
      right = arr.length() - 1;
    }
    if (left >= right) {
      return;
    }

    let mid = Math.floor((left + right) / 2);
    if (right - left > 1) {
      mergeSort(arr, left, mid);
      mergeSort(arr, mid + 1, right);
    }
    let nextLeft = left;
    let nextRight = mid + 1;
    let perm = [];
    for (let i = left; i <= right; i++) {
      let choice = null;
      if (nextLeft <= mid && nextRight <= right) {
        if (arr.lessThan(nextLeft, nextRight)) {
          choice = "L";
        } else {
          choice = "R";
        }
      } else if (nextLeft > mid) {
        choice = "R";
      } else if (nextRight > right) {
        choice = "L";
      }
      if (choice === "L") {
        perm.push(nextLeft - left);
        nextLeft++;
      } else if (choice === "R") {
        perm.push(nextRight - left);
        nextRight++;
      } else {
        throw "NO PERMUTATIONS";
      }
    }
    let swaps = permSwap(perm);
    for (let i = 0; i < swaps.length; i++) {
      arr.swap(swaps[i][0] + left, swaps[i][1] + left);
    }
  }

  /*
   * Stores references to each sort algorithm
   */
  let algorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort
  };

  /*
   * Stores strings explaining each algorithm
   */
  let explaination = {
    bubble:
      "Bubble sort is a basic sorting algorithm that loops through the array twice comparing the current item and the next item. if the next item is smaller, it will swap the two values. It runs in average O(n^2) as we loop through the array n(n-1)/2 times time and O(1) space complexity as we only need to store the array and a temp variable",
    selection:
      "Selection sort sorts by repeatedly finding the minimum element from the array and putting it at the beggining. This way it selects the element to put in the beggining. it has O(n^2) average time complexity.",
    insertion:
      "Insertion sort builds a final array one item at a time. It iterates through the array looking for where the element should be inserted one at a time. It has O(n^2) average time complexity",
    merge:
      "Merge sort is a divide and conquer algorithm that divides the array into several sub arrays, sorts those, and then merges them back together. This is done recursivly, and as such has an O(nlogn) time complexity. "
  };

  /*
   * Stores strings with pseudo code for each algorithm
   */
  let code = {
    bubble:
      "BubbleSort(array): \n  for i to n: \n    for j to n-i-1: \n     if array[j] > arr[j+1] \n      swap(array[j] ,array[j+1])",
    selection:
      "SelectionSort(array): \n   for i = 1 to n - 1: \n     min = i \n     for j = i+1 to n: \n       if array[j] < list[min] then \n           min = j \n        if indexMin != i then \n          swap(list[min], list[i]",
    insertion:
      "InsertionSort(array): \n   for j = 2 to n: \n     key = array[j] \n      insert array[j] \n     i = j - 1\n     while i > 0 and array[i] > key:\n       do array[i+1] = array[i]\n        i = i -1 \n     array[i+1] = key",
    merge:
      "MergeSort(array, left, right): \n    if left > right\n     return\n    mid = (left + right)/2\n    MergeSort(array, left, mid);\n    MergeSort(array, mid+1, right);\n    Merge(array, left, mid, right)"
  };

  /*
   * Gets the sorting algorithm
   */
  function getAlgo(algo) {
    let sort = algorithms[algo];
    return sort;
  }

  /*
   * Gets the explanation for the given algorithm
   */
  function getExplaination(alg) {
    return explaination[alg];
  }

  /*
   * Gets the pseudo code for the given algorithm
   */
  function getCode(alg) {
    return code[alg];
  }

  function getTime() {
    return timer;
  }

  function getStillTiming() {
    return stillTiming;
  }
  return {
    drawBorder: drawBorder,
    animateArr: animateArr,
    getAlgo: getAlgo,
    getExplaination: getExplaination,
    getCode: getCode,
    getTime: getTime,
    getStillTiming: getStillTiming,
    algorithms: algorithms
  };
  return _sort;
})();
