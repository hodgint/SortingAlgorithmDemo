var sort = (function(){

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
})