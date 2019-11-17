/************************************
 * File: sort.js
 * Name: Travis Hodgin
 * Desc: Calculates and displays 
 *       several sorting algorithms
 ************************************/
var sort = (function(){


    /* Colors Hex codes */
    const DEFAULT_COLOR = '#777';
    const SWAP_COLOR = '#FF0000';
    const COMPARE_COLOR = '#008000'

    /*
    * Returns a random number between two given numbers
    * Inputs:
    * - high: highest the random number can be
    * - low: lowest the random number can be
    */
    function randInt(high, low){
        return low + Math.floor((high - low + 1) * Math.random);
    }

    function drawBorder(canvas){
        var context = canvas.getContext('2d');
        context.strokeRect(0,0, canvas.width, canvas.height);
    }
    /*
    * Draws boxes to display given array with
    * Colors given
    * Inputs:
    * - arr: an array of numbers
    * - canvas: DOM object where to draw
    * - colors: array of strings. ith 
    * element is the color of the ith element in arr.
    */
   function drawArray(arr, canvas, colors){
        /* canvas setup */
        var context = canvas.getContext('2d');
        var width = 2;
        var size = arr.length;
        var spacing = canvas.width / ( width * size + size + 1);
        var barWidth = spacing * width; 
        
        context.clearRect(0,0, canvas.width, canvas.height);
        /* find min/max */
        var min = arr[0];
        var max = arr[0];
        for(var i = 0; i < size; i++){
            min = arr[i] < min ? arr[i] : min;
            max = arr[i] > max ? arr[i] : max;
        }

        /* utility function  to bounds y to between 0 and canvas height */
       function boundY(y){
           var a = canvas.height / (min - max);
           var b = canvas.height / (max - min);
           return a * y + b;
       }

       var yZero = boundY(0);
       context.beginPath();
       context.moveTo(0, yZero);
       context.lineTo(canvas.width, yZero);
       context.stroke();
       
        /* canvas border */
        context.strokeRect(0,0, canvas.width, canvas.height);
  
        /* draw boxes */
        var x = spacing;
        for(var i = 0; i < arr.length; i++){
            context.fillStyle = colors[i];
            var y = boundY(arr[i]);
            context.fillRect(x, y, barWidth, yZero - y)
            x  += spacing + barWidth
        }
    }

    /*
    * Animates the boxes on the canvas
    * Inputs:
    * - arr: an array of numbers
    * - canvas: DOM object where we draw
    */
    function animateArr(arr, canvas, interval){
        this._arr = arr;
        this._canvas = canvas;
        this._displayArr = [];
        this._colors = [];
        this._actions = [];
        for(var i = 0; i < arr.length; i++){
            this._displayArr.push(arr[i]);
            this._colors.push(DEFAULT_COLOR);
        }
        drawArray(this._arr, this._canvas, this._colors);
        var _this = this;
        this._id = window.setInterval(function() {_this._step();}, interval);

        /* Utility functions */
        animateArr.prototype.stop = function(){
            window.clearInterval(this._id);
        }
        animateArr.prototype.length = function(){
            return this._arr.length;
        }
        animateArr.prototype.swap = function(i, j){
            this._actions.push(['swap', i, j]);
            var t = this._arr[i];
            this._arr[i] = this._arr[j]
            this._arr[j] = t;
        }
        animateArr.prototype.compare = function(i, j){
            this._actions.push(['compare', i, j])
            return this._arr[i] - this._arr[j];
        }
        animateArr.prototype.greaterThan = function(i, j){
            return this.compare(i, j) > 0;
        }
        animateArr.prototype.lessThan = function(i, j){
            return this.compare(i, j) < 0;
        }
        animateArr.prototype._step = function(){
            if(this._actions.length === 0){
                drawArray(this._displayArr, this._canvas, this._colors);
                return;
            }
            var action = this._actions.shift();
            var i = action[1];
            var j = action[2];
            if(action[0] === 'swap'){
                this._colors[i] = SWAP_COLOR;
                this._colors[j] = SWAP_COLOR;
                var temp = this._displayArr[i];
                this._displayArr[i] = this._displayArr[j];
                this._displayArr[j] = temp;  
            } else if (action[0] === 'compare'){
               this._colors[i] = COMPARE_COLOR;
                this._colors[j] = COMPARE_COLOR;
            }
            drawArray(this._displayArr, this._canvas, this._colors);
            this._colors[i] = DEFAULT_COLOR;
            this._colors[j] = DEFAULT_COLOR;
        }
    
    }

    /* 
    * Sorts given array using bubble sort
    * - arr: an array of numbers
    */
   function bubbleSort(arr) {
        var size = arr.length();
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size - i - 1; j++){
                if(arr.lessThan(j+1, j)){
                    arr.swap(j, j+1);
                }
            }
        }
    }

    function selectionSort(arr){
        var size = arr.length();
        for(var i = 0; i < size - 1; i++){
            var minJ = i;
            for(var j = i; j < size; j++){
                if(arr.lessThan(j, minJ)){
                    minJ = j;
                }
            }
            arr.swap(i, minJ);
        }
    }

    function insertionSort(arr){
        var size = arr.length();
        for(var i = 1; i < size; i++){
           for(var j = i; j > 0 && arr.lessThan(j, j-1); j--){
                arr.swap(j, j-1);
            } 
        }
    }


    function checkPerm(perm){
        var size = perm.length;
        var used = {};
        for(var i = 0; i < size; i++){
            if(used[perm[i]]){
                return false;
            }
            used[perm[i]] = true;
        }
        for(var i = 0; i < size; i++){
            if(!used[i]){
                return false;
            }
        }
        return true;
    }

    /* Permutation to transpositions */
    function permSwap(perm){
        console.log('PERM: ');
        console.log(perm);
        if(checkPerm(perm)=== false){
            throw " Invalid permutaion"
        }
        var size = perm.length;
        var used = [];
        for(var i = 0; i < size; i++){
            used.push(false);
        }
        var trans = [];
        for(var i = 0; i < size; i++){
            if(used[i]) continue
            var curr = i;
            if(perm[i] == i){
                used[i] = true;
            }
            while(!used[perm[curr]]){
                trans.push([curr, perm[curr]]);
                used[curr] = true;
                curr = perm[curr];
            }
        }
        return trans;

    }
    
    function mergeSort(arr, left, right){
        console.log('-- IN MERGE');
        if(typeof(left) === null){
            left = 0
        }
        if(typeof(right) === null){
            right = arr.length() - 1;
        }
        if(left >= right){
            return
        }

        var mid = Math.floor((left + right) / 2);
        if(right - left > 1){
            mergeSort(arr, left, mid);
            mergeSort(arr, mid+1, right);
        }

        var nextLeft = left;
        var nextRight = mid+1;
        var perm = [];
        for(var i = left; i <= right; i++){
            console.log('in choice');
            var choice = null;
            if(nextLeft <= mid && nextRight <= right){
                if(arr.lessThan(nextleft, nextRight)){
                    choice = 'L';
                }else{
                    choice = 'R';
                }
            } else if(nextLeft > mid){
                choice = 'R'
            } else if(nextRight > right){
                choice = 'L'
            }
            if(choice === 'L'){
                perm.push(nextLeft - left);
                nextLeft++;
            } else if(choice === 'R'){
                perm.push(nextRight - left);
                nextRight++;
            } else {
                throw 'NO PERMUTATIONS'
            }
        }
        var swaps = permSwap(perm);
        for(var i = 0; i < swaps.length; i++){
            console.log('- SWAPING');
            arr.swap(swaps[i][0] + left, swaps[i][1] + left);
        }
    }

    /*
    * Stores references to each sort algorithm
    */
    var algorithms = {
        'bubble': bubbleSort,
        'selection': selectionSort,
        'insertion': insertionSort,
        'merge': mergeSort,
    }

    var explaination = {
        'bubble': 'Bubble sort is a basic sorting algorithm that loops through the array twice comparing the current item and the next item. if the next item is smaller, it will swap the two values. It runs in O(n^2) as we loop through the array n(n-1)/2 times time and O(1) space complexity as we only need to store the array and a temp variable',
    }

    var bubble = "BubbleSort(array): \n  for i to n: \n    for j to n-i-1: \n     if array[j] > arr[j+1] \n      swap(array[j] ,array[j+1])";
    var code = {
        'bubble': bubble.toString(),
    }

    /* 
    * Gets the sorting algorithm 
    */
    function getAlgo(algo){
        var sort = algorithms[algo]
        return sort; 
    }

    function getExplaination(alg){
        return explaination[alg]
    }
    function getCode(alg){
        return code[alg]
    }

    return {
        'drawBorder': drawBorder,
        'animateArr': animateArr,
        'getAlgo': getAlgo,
        'getExplaination': getExplaination,
        'getCode': getCode,
        'algorithms': algorithms,
    }
    return _sort;
})();