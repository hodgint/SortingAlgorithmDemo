var sort = (function(){

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
        var context = canvas.context('2d');
        var width = 2;
        var size = arr.length;
        var spacing = canvas.width / ( width * n + n + 1);
        var barWidth = spacing * width; 

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

        /* canvas border */
        context.strokeRect(0,0,canvas.width, canvas.height);
        /* draw boxes */
        var x = spacing;
        context.beginPath()
        context.moveTo(0,0);
        context.lineTo(canvas.width, 0);
        for(var i = 0; i < size; i++){
            context.fillStyle = colors[i];
            var y = boundY(arr[i]);
            context.fillRect(x, y, barwidth, 0, )
        }
        x  = x + spacing + barWidth

    }

    /*
    * Animates the boxes on the canvas
    * Inputs:
    * - arr: an array of numbers
    * - canvas: DOM object where we draw
    */
    function animateArr(arr, canvas){
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
        animateArr.prototype._swap = function(i, j){
            this._actions.push(['swap', i, j]);
            var temp = arr[i];
            arr[i] = arr[j]
            arr[j] = temp;
        }
        animateArr.prototype._compare = function(i, j){
            this._actions.push(['compare', i, j])
            return arr[i] - arr[j];
        }
        animateArr.prototype.greaterThan = funciton(i, j){
            return this.compare(i, j) > 0;
        }
        animateArr.prototype.lessThan = funciton(i, j){
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
            } else if (action[0] === 'compare'){
                this._colors[i] = COMPARE_COLOR;
                this._colors[j] = COMPARE_COLOR;
                var temo = this.displayArr[i];
                this._displayArr[i] = this.displayArr[j];
                this.displayArr[j] = temp;
            }
            drawArray(this._displayArr, this._canvas, this._colors);
            this._colors[i] = DEFAULT_COLOR;
            this._colors[j] = DEFAULT_COLOR;
        }
    }

    /*
    * Returns the difference between
    * two elements in the given array
    * Inputs: 
    * - arr: an array of numbers
    * - i: first element to compare
    * - j: second element to compare
    */
    function compare(arr, i, j){
        return arr[i] - arr[j];
    }

    /*
    * Swaps two elements in the given array
    * Inputs:
    * - arr: an array of numbers
    * - i: first element to swap
    * - j: second element to swap
    */
    function swap(arr, i, j){
        var temp = arr[i];
        arr[i] = arr[j]
        arr[j] = temp;
    }
    /* 
    * Sorts given array using bubble sort
    * - arr: an array of numbers
    */
   function bubbleSort(arr) {
        var size = arr.length;
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size - i - 1; j++){
                if(compare(arr,j+1, j) < 0){
                    swap(arr, j, j+1);
                }
            }
        }
    }
    var algorithms = {
        'bubble': bubbleSort
    }

    return {
        animatArr: animateArr,
        algorithms: algorithms
    }
})();